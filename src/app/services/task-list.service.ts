import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { merge } from 'rxjs';
import { reduce, map, mapTo } from 'rxjs/operators';
import { concat } from 'rxjs';
import { Project, TaskList, Task } from '../domain';

@Injectable()
export class TaskListService {
  private readonly domain = 'taskLists';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    @Inject('BASE_CONFIG') private config: { uri: string },
    private http: HttpClient
  ) {}

  add(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post<TaskList>(uri, JSON.stringify(taskList), {
      headers: this.headers
    });
  }

  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    };
    return this.http.patch<TaskList>(uri, JSON.stringify(toUpdate), {
      headers: this.headers
    });
  }

  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http.delete(uri).pipe(mapTo(taskList));
  }

  // GET /tasklist
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<TaskList[]>(uri, { params });
  }

  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http.patch<TaskList>(
      dragUri,
      JSON.stringify({ order: target.order }),
      { headers: this.headers }
    );
    const drop$ = this.http.patch<TaskList>(
      dropUri,
      JSON.stringify({ order: src.order }),
      { headers: this.headers }
    );
    // great example of using rxjs for two ajax/async calls
    // arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])
    // reduce((accumulator, 当前元素)=> res, initialVal) -> if second arg is [], it will make accumunate
    // also an array, 每次迭代进去都会得到一个新的数组
    // 这里除了concat，也可以merge，也可以combineList, without reduce
    return concat(drag$, drop$).pipe( // this will make sure drag first, then drop
      reduce((r: TaskList[], x: TaskList) => [...r, x], [])
    );
  }

  initializeTaskLists(prj: Project): Observable<Project> {
    const id = <string>prj.id;
    return merge(
      this.add({ id: undefined, name: 'todo', projectId: id, order: 1 }),
      this.add({ id: undefined, name: 'in progress', projectId: id, order: 2 }),
      this.add({ id: undefined, name: 'complete', projectId: id, order: 3 })
    ).pipe(
      reduce((r: TaskList[], x: TaskList) => [...r, x], []),
      map((tls: TaskList[]) => ({
        ...prj,
        taskLists: tls.map(tl => <string>tl.id)
      }))
    );
  }
}
