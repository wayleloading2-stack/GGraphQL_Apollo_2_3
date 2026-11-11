import strawberry
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

@strawberry.type
class Book:
    id: int
    title: str
    author: str
    year: int

@strawberry.input
class BookInput:
    title: str
    author: str
    year: int


books = [
    Book(id=1, title="1984", author="Джордж Оруэлл", year=1949),
    Book(id=2, title="Мастер и Маргарита", author="Михаил Булгаков", year=1967),
    Book(id=3, title="Преступление и наказание", author="Фёдор Достоевский", year=1866),
]

@strawberry.type
class Category:
    id: int
    name: str


@strawberry.type
class Task:
    id: int
    title: str
    is_completed: bool
    category: Category


category = Category(id=1, name="Общие")
tasks = [
    Task(id=1, title="Изучить GraphQL", is_completed=True, category=category),
    Task(id=2, title="Подключить Apollo Client", is_completed=False, category=category),
]


@strawberry.type
class Query:
    @strawberry.field
    def books(self) -> list[Book]:
        return books

    @strawberry.field
    def book(self, id: int) -> Book | None:
        for book in books:
            if book.id == id:
                return book
        return None

    @strawberry.field
    def all_tasks(self) -> list[Task]:
        return tasks


@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_book(self, data: BookInput) -> Book:
        book = Book(
            id=max((b.id for b in books), default=0) + 1,
            title=data.title,
            author=data.author,
            year=data.year)

        books.append(book)
        return book

    @strawberry.mutation
    def delete_book(self, id: int) -> bool:
        for book in books:
            if book.id == id:
                 books.remove(book)
                 return True
        return False

    
    @strawberry.mutation
    def update_book(self, id: int, data: BookInput) -> Book | None:
        for book in books:
            if book.id == id:
                book.title = data.title
                book.author = data.author
                book.year = data.year
                return book
        return None


    @strawberry.mutation
    def create_task(self, title: str) -> Task:
        title = title.strip()
        if not title:
            raise ValueError("Название задачи не может быть пустым")

        task = Task(
            id=max((t.id for t in tasks), default=0) + 1,
            title=title,
            is_completed=False,
            category=category,
        )
        tasks.append(task)
        return task

    @strawberry.mutation
    def complete_task(self, id: int) -> Task:
        for task in tasks:
            if task.id == id:
                task.is_completed = True
                return task
        raise ValueError("Задача не найдена")


schema = strawberry.Schema(query=Query, mutation=Mutation)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(GraphQLRouter(schema), prefix="/graphql")
