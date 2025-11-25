/**
 * Type definitions for the application
 */

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  [key: string]: any;
}

export interface Discussion {
  _id: string;
  title: string;
  content: string;
  topic: string;
  tags: string[];
  author: User;
  createdAt: string;
  updatedAt: string;
  views?: number;
  likes?: number;
  [key: string]: any;
}

export interface Comment {
  _id: string;
  content: string;
  author: User;
  discussionId: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  topic: string;
  tags: string[];
  author: User;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface FilterObject {
  topic?: string;
  title?: string;
  tags?: string;
  sortBy?: string;
}

export interface CodeExecutionRequest {
  code: string;
  language: string;
  version: string;
  userInput?: string;
  cmdargs?: string;
}

export interface CodeExecutionResponse {
  output: string;
  error?: string;
  executionTime?: number;
}

