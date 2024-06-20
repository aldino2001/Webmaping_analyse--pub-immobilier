<?php

namespace App\Models;

use CodeIgniter\Model;

class PostModel extends Model
{
    protected $table            = 'post';
    protected $primaryKey       = 'post_id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['title_post','descibe_post','post_lat','post_lng','user_user_id'];

}
