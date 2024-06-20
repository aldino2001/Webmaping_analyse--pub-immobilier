<?php

namespace App\Controllers;
use App\Models\QueryList;
use App\Controllers\BaseController;
use CodeIgniter\RESTful\ResourceController;
use App\Models\ImageModel;
use App\Models\PostModel;
class UploadFile extends ResourceController
{
    public function index()
    {
        //
    }
    public function uploadImage(){
        helper(['form', 'url']);
        $querylist = new QueryList();
        $this->PostModel = new PostModel();
        $this->ImageModel =  new ImageModel();
        $files = $this->request->getFiles();
        $descriptions = $this->request->getVar('descriptions');
        $userId= $this->request->getVar('userId');
        $lat = $this->request->getVar('lat');
        $lng= $this->request->getVar('lng');
        $title= $this->request->getVar('title');
        $postData = [
            "title_post"=>$title,
            "descibe_post"=>$descriptions,
            "post_lat"=>$lat,
            "post_lng"=>$lng,
            "user_user_id"=>$userId
        ];
        $this->PostModel->save($postData);
        $post_id = $querylist->get_end_postimage();
        print_r($post_id[0]);
     
        if ($files) {
            foreach ($files['images'] as $key => $img) {
                if ($img->isValid() && !$img->hasMoved()) {
                    $newName = $img->getRandomName();
                    $img->move(WRITEPATH . '../public/UploadFile', $newName);
                    $data = [
                        'image_name' => $newName,
                        'post_post_id' => $post_id[0]
                    ];
                    $this->ImageModel->save($data);
                }
            }
        }
        
    }
}
