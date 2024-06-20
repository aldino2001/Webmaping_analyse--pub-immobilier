<?php
namespace App\Controllers;
use App\Models\QueryList;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
class User extends ResourceController
{
    public function get_user($id_user=null)
    {
        $querylist = new QueryList();
        //$id = $this->request->getVar('user_id');
        $data= $querylist->get_user($id_user);
        return $this->respond($data);
    }
}
