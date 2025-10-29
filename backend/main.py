from fastapi import FastAPI 
from pydantic import BaseModel
from asteval import Interpreter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme için açık, prod'da domain belirt
    allow_methods=["*"],
    allow_headers=["*"],
)
aeval = Interpreter()

class Expression(BaseModel):
    expr: str

@app.post("/calculate")
def calculate(expression: Expression):
    try:
        result = aeval(expression.expr)
        return {"result": result}
    except Exception as ex:
        return {"error": str(ex)}