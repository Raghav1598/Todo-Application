package com.cts.todo;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardCodedService {
	
	private static List<Todo> todos = new ArrayList();
	private static int idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter, "raghav", "Learn React", new Date(), false));
		todos.add(new Todo(++idCounter, "raghav", "Learn MicroServices"	, new Date(), false));
		todos.add(new Todo(++idCounter, "cts", "Learn Docker", new Date(), false));
	}
	
	public List<Todo> findAll(String username){
//		List<Todo> list = new ArrayList();
//		for(Todo to_do: todos) {
//			if(to_do.getUsername().equals(username)) {
//				list.add(to_do);
//			}
//		}
		return todos;
	}
	
	public Todo deleteById(long id) {
		Todo todo = findById(id);
		todos.remove(todo);
		return todo;
	}

	public Todo findById(long id) {
		// TODO Auto-generated method stub
		for(Todo todo: todos) {
			if(todo.getId() == id)return todo;
		}
		return null;
	}
	
	public Todo save(Todo todo) {
		if(todo.getId() == -1 || todo.getId()==0) {
			todo.setId(++idCounter);
			todos.add(todo);
		}else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
}
