# 
FROM python:3.9

# 
WORKDIR /

RUN ls -la

# 
COPY ./requirements.txt /requirements.txt

RUN ls -la

RUN pip3 install --no-cache-dir --upgrade -r /requirements.txt

RUN ls -la
# 
COPY ./app /app

#
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["python3", "app/main.py"]