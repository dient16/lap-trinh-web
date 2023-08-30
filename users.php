<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "assignment_3";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

if (isset($_GET["action"]) && $_GET["action"] === "delete" && isset($_GET["id"])) {
    $id = $_GET["id"];

    $delete_query = "DELETE FROM users WHERE id = $id";

    if ($conn->query($delete_query) === TRUE) {
        echo "Người dùng đã được xóa thành công.";
    } else {
        echo "Lỗi khi xóa người dùng: " . $conn->error;
    }
}

$select_query = "SELECT * FROM users";
$result = $conn->query($select_query);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý người dùng</title>
    <style>
       body {
            font-family: Arial, sans-serif;
        }
        h2 {
            text-align: center;
        }
        table {
            border-collapse: collapse;
            width: 80%;
            margin: 0 auto;
            border: 1px solid #ddd;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        td a {
            color: red;
            text-decoration: none;
        }
        td a:hover {
            color: darkred;
        }
    </style>
</head>
<body>
    <h2>Danh sách thành viên</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Mã sinh viên</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Giới tính</th>
            <th>Sở thích</th>
            <th>Quốc tịch</th>
            <th>Ghi chú</th>
            <th>Hành động</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>";
                echo "<td>" . $row["student_card"] . "</td>";
                echo "<td>" . $row["fullname"] . "</td>";
                echo "<td>" . $row["email"] . "</td>";
                echo "<td>" . $row["gender"] . "</td>";
                echo "<td>" . $row["hobbies"] . "</td>";
                echo "<td>" . $row["nationality"] . "</td>";
                echo "<td>" . $row["note"] . "</td>";
                echo '<td><a href="?action=delete&id=' . $row["id"] . '">Xóa</a></td>';
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='9'>Không có thông tin người dùng nào.</td></tr>";
        }
        ?>
    </table>
</body>
</html>
