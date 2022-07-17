<?php

include '../connection/config.php';

$method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'POST':
            $user = json_decode(file_get_contents('php://input'));

            $username = $user->username; 
            $password = $user->password;
        
            $stmt = $db->prepare("SELECT * FROM details WHERE username = ?;");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if(mysqli_num_rows($result) != 0) {
                while ($user = mysqli_fetch_assoc($result)) {
                    if(password_verify( $password, $user['password'])) {
                        $data = ['status' => 1, 'message' => "Success"];
                    }else {
                        $data = ['status' => 0, 'message' => "Invalid details"];
                    }
                }
            }else{
				$data = ['status' => 0, 'message' => "Invalid details"];
			}
            echo json_encode($data);
            break;
}
?>