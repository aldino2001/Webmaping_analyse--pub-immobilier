<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('getuser/(:any)','User::get_user/$1');
$routes->post('login/(:any)/(:any)','AuthController::login/$1/$2');
$routes->post('createcartier/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)','CartierController::createcartier/$1/$2/$3/$4/$5/$6/$7');
$routes->get('getcartier','CartierController::getcartierResult');
$routes->post('upload', 'UploadFile::uploadImage');
