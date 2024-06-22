<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\QueryList;

class PostController extends ResourceController
{
    public function index()
    {
        //
    }
    public function getAllData(){
        $querylist = new QueryList();
        $mainData = $querylist->getpost();
        $data = [];
        foreach($mainData as $resultat){
            $subData = $querylist->getImage($resultat["post_id"]);
            $data[] = [
                "post_id"=>$resultat["post_id"],
                "lat"=>$resultat["post_lat"],
                "lng"=>$resultat["post_lng"],
                "image" =>$subData
            ];
        }
        return $this->respond($data);
    }
}
