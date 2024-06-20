<?php

namespace App\Controllers;
use App\Models\CartierModel;
use App\Models\QueryList;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class CartierController extends ResourceController
{
    public function index()
    {
        //
    }
    public function createcartier($cartier_lng,$cartier_lat,$cartier_describe,$cartier_name,$cartier_rayon,$user_user_id,$etat_id){
        $this->CartierModel = new CartierModel();
        $data = [
            "cartier_lng" => $cartier_lng,
            "cartier_lat" => $cartier_lat, 
            "cartier_describe" => $cartier_describe,
            "cartier_name" => $cartier_name,
            "cartier_rayon"=>$cartier_rayon,
            "user_user_id" => $user_user_id,
            "etat_id"      =>$etat_id
        ];
        //return $this->respond($data);
        return $this->CartierModel->save($data);
    }
    public function getcartierResult(){
        $querylist = new QueryList();
        $data = $querylist->get_cartier();
        return $this->respond($data);
    }
}
