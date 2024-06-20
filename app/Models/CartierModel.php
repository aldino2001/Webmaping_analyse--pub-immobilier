<?php

namespace App\Models;

use CodeIgniter\Model;

class CartierModel extends Model
{
    protected $table            = 'cartier';
    protected $primaryKey       = 'cartier_id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['cartier_lng','cartier_lat','cartier_describe','cartier_name','cartier_rayon','user_user_id','etat_id'];
}
