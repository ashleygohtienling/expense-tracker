import mysql.connector



class MySQLConnection:
    def __init__(self):
        self.connection = None

    def connect(self, host, port, user, password, database):
        try:
            self.connection = mysql.connector.connect(
                host=host,
                port=port,
                user=user,
                password=password,
                database=database,
                auth_plugin='mysql_native_password'
            )
            print("Connected to MySQL database")
        except mysql.connector.Error as err:
            print(f"Error: {err}")
    
    def execute_query(self, query):
        try:
            cursor = self.connection.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows
        except mysql.connector.Error as err:
            print(f"Error executing query: {err}")
    
    def close_conn(self):
        if self.connection:
            connection.close()
            print("MySQL connection closed")
