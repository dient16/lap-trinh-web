<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "assignment_3";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

$create_table_query = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_card VARCHAR(20) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    hobbies TEXT,
    nationality VARCHAR(20) NOT NULL,
    note TEXT
)";

if ($conn->query($create_table_query) === TRUE) {
} else {
    echo "Lỗi khi tạo bảng: " . $conn->error;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $student_card = $_POST['student_card'];
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $hobbiesArray = isset($_POST['hobbies']) ? $_POST['hobbies'] : array();
    $hobbies = implode(', ', $hobbiesArray);
    $nationality = $_POST['nationality'];
    $note = $_POST['note'];

    $insert_query = "INSERT INTO users (student_card, fullname, email, gender, hobbies, nationality, note) VALUES ('$student_card', '$fullname', '$email', '$gender', '$hobbies', '$nationality', '$note')";

    if ($conn->query($insert_query) === TRUE) {
    } else {
        echo "Lỗi: " . $conn->error;
    }
}
