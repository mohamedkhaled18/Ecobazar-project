<?php

    class SqlConnection {
        private $conn;
        private $result;
        private $dbName;

        public function __construct(string $dbName) {
            $this->dbName = $dbName;
        }

        public function connect() {
            $this->conn = mysqli_connect("localhost", "root", "", $this->dbName);
            if (!$this->conn) {
                die("Connection Failed: ". mysqli_connect_error());
            }
            return $this->conn;
        }

        public function query($query) {
            if (empty($query) || !isset($query)) {
                throw new Exception("This query is invalid");
                exit();
            }
            $this->result = mysqli_query($this->conn, $query);
            return $this->result;
        }

        public function insert(string $table, array $fields, array $values) {
            if (empty($table) || !isset($table)) {
                throw new Exception("You should specify the table");
            } else if (count($fields) === 0 || count($values) === 0) {
                throw new Exception("Please type the fields and values");
            } else {
                $fields = implode(", ", $fields);
                $values = implode(", ", $values);
                $query = "INSERT INTO $table($fields) VALUES($values)";
                return $this->query($query);
            }
        }

        public function select(string $table, $where = '') {
            if (empty($table) || !isset($table)) {
                throw new Exception("You should specify the table");
            } else {
                $query = "SELECT * from $table ";
                if (!empty($where)) {
                    $query .= "WHERE $where";
                }
                return $this->query($query);
            }
        }

        public function close() {
            mysqli_close($this->conn);
        }
    }