<?php

include '../connection/config.php';

$method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'POST':
            $user = json_decode(file_get_contents('php://input'));


            $firstname = $user->firstname;
            $lastname = $user->lastname;
            $username = $user->username;
            $hashed = password_hash($user->password, PASSWORD_DEFAULT);
        
            
			$check = $db->prepare("SELECT * FROM details WHERE username = ?;");
            $check->bind_param("s", $username);
            $check->execute();
            $res = $check->get_result();
			
			if(mysqli_num_rows($res) === 0){
				$stmt = $db->prepare("insert into details(firstname, lastname, username, password) values (?, ?, ?, ?);");
				$stmt->bind_param("ssss", $firstname, $lastname, $username, $hashed);
				$stmt->execute();
				$data = ['status' => 1, 'message' => "Account Successfully Registered!"];
			}else{
				$data = ['status' => 0, 'message' => "Account already exist!"];
			}
            echo json_encode($data);
            break;
}

?>