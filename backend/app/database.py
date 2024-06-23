import mysql.connector 
from mysql.connector import pooling
from typing import Optional, Tuple, List

class MySQLConnection:
    _instance = None
    # def __init__(host: str, port: int, user: str, password: str, database: str)-> None:
    #     self._host = host
    #     self._port = port
    #     self._user = user
    #     self._password = password
    #     self._database = database
    #     self.db_pool = self.create_pool()

    def __new__(cls, host: str, port: int, user: str, password: str, database: str) -> 'MySQLConnection':
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._host = host
            cls._instance._port = port
            cls._instance._user = user
            cls._instance._password = password
            cls._instance._database = database
            cls._instance.db_pool = cls._instance.create_pool()
        return cls._instance

    def create_pool(self) -> pooling.MySQLConnectionPool:
        self.pool = pooling.MySQLConnectionPool(
            pool_name="my_pool",
            pool_size=5,
            pool_reset_session=True,
            host=self._host,
            port=self._port,
            user=self._user,
            password=self._password,
            database=self._database,
            auth_plugin='mysql_native_password'
        )
        return self.pool

    def get_connection(self)-> Optional[mysql.connector.connection.MySQLConnection]:
        try:
            return self.db_pool.get_connection()
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            return None
    
    def execute_query(self, query: str) -> Optional[List[Tuple]]:
        connection = self.get_connection()
        if not connection:
            return None
        try:
            cursor = connection.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows
        except mysql.connector.Error as err:
            print(f"Error executing query: {err}")
            return None
        finally:
            #Return connection to pool
            if connection.is_connected():
                self.close(connection, cursor)
    
    def execute_update(self, query: str) -> None:
        connection = self.get_connection()
        if not connection:
            return None
        try:
            cursor = connection.cursor()
            cursor.execute(query)
            connection.commit()
            print("Update query executed successfully")
        except mysql.connector.Error as err:
            connection.rollback()
            print(f"Error executing update query {err}")
        finally:
            if connection.is_connected():
                self.close(connection, cursor)
    
    def close(self, connection: mysql.connector.cursor.MySQLCursor, cursor: mysql.connector.cursor.MySQLCursor) -> None:
        """
        A method used to close connection of mysql.
        :param connection: 
        :param cursor: 
        :return: 
        """
        cursor.close()
        connection.close()

    def close_pool(self) -> None:
        self.db_pool.closeall()

