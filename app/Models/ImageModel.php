<?php

namespace App\Models;

use CodeIgniter\Model;

class ImageModel extends Model
{
    protected $table            = 'post_image';
    protected $primaryKey       = 'image_id';
    protected $allowedFields    = ['image_name','post_post_id'];

    // Dates
   
}
