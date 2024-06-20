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
}