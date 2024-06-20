<?php

namespace App\Controllers;
use App\Models\UserModel;
use App\Models\QueryList;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class AuthController extends ResourceController
{
    public function login($email,$password){
        $User = session();
        $model = new UserModel();
        //$email = $this->request->getVar('email');
        //$password = $this->request->getVar('password');
        $data = $model->where('user_email', $email)->first();
        //print_r("data = ",$data);
        if($data){
            $pass = $data['user_password'];
            //$id_user = $data["user_id"];
            if($pass==$password){
                $data = [
                    'logged'     => true,
                    "user_id" => $data['user_id'],
                    "user_email" => $data['user_email']
                ];
                //return $this->respond($ses_data);
                //print_r($data['user_id']);
                return $this->respond($data,200);
            }else{
                $response =[
                    'message'=>'Login error',
                    'token'=>"",
                    //'test'=>$decode_token
                ];
                //return $this->respond($ses_data);
                //print_r($data['user_id']);
                return $this->respond($response,200);
            }
        }else{
            $response =[
                'message'=>'Login error',
                'token'=>"",
                //'test'=>$decode_token
            ];
            //return $this->respond($ses_data);
            //print_r($data['user_id']);
            return $this->respond($response,200);
        }
    }
}