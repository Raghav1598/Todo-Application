package com.cts.todo;

import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoResource {

	@Autowired
	private TodoHardCodedService todoService;
	
	@GetMapping(path="/users/{username}")
	public List<Todo> getAllTodos(@PathVariable String username){
		return todoService.findAll(username);
	}
	
	@GetMapping(path="/users/{username}/todo/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id){
		return todoService.findById(id);
	}
	
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){
		Todo todo = todoService.deleteById(id);
		if(todo!=null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/users/{username}/todo/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo){
		Todo todoUpdated = todoService.save(todo);
		return new ResponseEntity<Todo>(todoUpdated, HttpStatus.OK);
	}
	
	@PostMapping("/users/{username}/todo")
	public ResponseEntity<Void> addTodo(@PathVariable String username, @RequestBody Todo todo){
		Todo todoUpdated = todoService.save(todo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(todoUpdated.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
}
