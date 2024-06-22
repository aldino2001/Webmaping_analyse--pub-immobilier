<?php
namespace App\Models;
use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
class Querylist extends Model
{
   public function get_user($user_id){
     $query = "select * from user where user_id = ?";
     $query=$this->db->query($query,[$user_id]);
     return $query->getResultArray();
   }
   public function get_cartier(){
     $query = "select * from cartier,cartier_etat where cartier.etat_id=cartier_etat.id_etat";
     $query = $this->db->query($query);
     return $query->getResultArray();
   }
   public function get_end_postimage(){
      $query = "select post_id from post order by post_id desc limit  1";
      $query = $this->db->query($query);
      return $query->getResultArray();
   }
   public function getpost(){
    $query = "select * from post";
    $query = $this->db->query($query);
    return $query->getResultArray();
   }
   public function getImage($post_id){
    $query = "select * from post_image where post_post_id=?";
    $query = $this->db->query($query,[$post_id]);
    return $query->getResultArray();
   }
}