package com.cts.todo.basic.auth;

public class AuthenticationBean {
	private String msg;

	AuthenticationBean(String msg){
		this.setMsg(msg);
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	@Override
	public String toString() {
		return "HelloWorldBean [msg=" + msg + "]";
	}
}
