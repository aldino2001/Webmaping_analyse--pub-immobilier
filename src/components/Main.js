import React, { forwardRef, useEffect, useState,useContext } from 'react';
import { Circle,MapContainer, TileLayer, Marker, Popup, useMapEvents,useMap,Polygon,ZoomControl } from 'react-leaflet';
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PublishIcon from '@mui/icons-material/Publish';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import L from 'leaflet';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import * as turf from '@turf/turf';
import FloatingCard from './FloatingPostCard';
import CartierPolygone from './CartierPolygone';
import axios from 'axios';
import {logintest} from "./Login";
import { LoginContext } from './LoginContext';
import Login from './Login';
import RightContent from './rightContent';
import PostDetailDialog from './PostDetail';

const ChangeView = ({zoom}) => {
  const map = useMap();
  map.setZoom(zoom);
  return null;
};
const MapWithClickHandler = ({ isSelectingLocation, onSelectLocation }) => {
  useMapEvents({
    click: (e) => {
      if (isSelectingLocation) {
        onSelectLocation(e.latlng);
      }
    },
  });
  return null;
};

const customIcon = new L.Icon({
  iconUrl: 'forsale.png', // URL de votre icône personnalisée
  iconSize: [30, 30], // Taille de l'icône
  iconAnchor: [12, 41], // Point d'ancrage de l'icône
  popupAnchor: [1, -34], // Point d'ancrage de la popup
  //shadowUrl: 'https://example.com/custom-icon-shadow.png', // URL de l'ombre de l'icône (facultatif)
  shadowSize: [41, 41], // Taille de l'ombre
});



const App = forwardRef(({center,zoom,isconnecteds},ref) => {
  const [isLeftBarOpen, setIsLeftBarOpen] = useState(false);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [cursorStyle, setCursorStyle] = useState({});
  const [value, setValue] = React.useState(2.7);
  const [polygon, setPolygon] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [IsCreatedPolygone,setIsCreatedPolygone]=useState([]);
  const[isPost,setIsPost]= useState(false);
  const [isFloatingCardVisible, setIsFloatingCardVisible] = useState(false);
  const [isCartierPolygone, setIsCartierPolygone] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("ralobo");
  const { loginData } = useContext(LoginContext);
  const [IsConnected, setIsConnected]=useState(false);
  const [PostDetail,setPostDetail] = useState([]);
  const [inputValue, setInputValue] = useState(false);
  const [isPolling, setIsPolling] = useState(true);
  const [isRightContentOpen,setIsRightcontentOpen]= useState(false);
  const [cartiedelailId,setCartierDetailId] = useState();
  const [cartierContent,setCartierContent] =useState([]);
  const [postOpen,setPostOpen] = useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;
  const handlePostOpen = ()=>{
    setPostOpen(true);
  }
  const handlepostClose=()=>{
    setPostOpen(false)
  }
  const toggleFloatingCard = () => {
    setIsFloatingCardVisible(!isFloatingCardVisible);
  };
  const toggleCartierPolygone = () => {
    setIsCartierPolygone(!isCartierPolygone);
    setInputValue(!inputValue)
  };
  const handleMenuClick = () => {
    setIsPost(false)
    setIsLeftBarOpen(!isLeftBarOpen);
  };
  const handleCloseRightContent= ()=>{
    setIsRightcontentOpen(false)
  }
  const handlePublish = () => {
    console.log('Ouvrir le formulaire de publication');
    // Ajoutez ici la logique pour ouvrir le formulaire de publication
  };
  const handlePost = ()=>{
    setIsPost(true);
    setIsLeftBarOpen(!isLeftBarOpen);
  }
  const handleLocationSelect = () => {
    setCursorStyle(isSelectingLocation ? { cursor: 'crosshair' } : {});
    setIsSelectingLocation(!isSelectingLocation) 
    setIsLeftBarOpen(!isLeftBarOpen);

  };

  const handleSelectLocation = (latlng) => {
    //console.log('Coordonnées sélectionnées:', latlng);
    setSelectedLocation(latlng);
    setIsSelectingLocation(false);
    setCursorStyle(isSelectingLocation ? { cursor: 'crosshair' } : {});
  };
  const handleCreatePolygon = () => {
    if (selectedLocation) {
      const point = turf.point([selectedLocation.lng, selectedLocation.lat]);
      const buffered = turf.buffer(point, 0.1, { units: 'kilometers' }); // 0.5 km radius
      const polygonCoords = buffered.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);
      setIsCreatedPolygone(polygonCoords);
      
      //console.log("polygone coordonné :",polygonCoords)
    };
  };
  const handleClickpoligone=(polygons) =>{
    setIsRightcontentOpen(true);
    setCartierDetailId(polygons.cartId);
    setCartierContent(polygons);
    //console.log('cartier: ',polygons.describe);
  }
  const getCartierdetail = async () =>{
    try{
      const cartier_result = await axios.get("http://localhost:8080/getcartier");
      //setCartierDetail(cartier_result.data);
      //console.log("cartiet",cartier_result.data);
      const newpolygone = cartier_result.data.map((item)=>{
            //console.log("latitude:",item.cartier_lat);
            const point = turf.point([ Number(item.cartier_lng), Number(item.cartier_lat)]);
            const buffered = turf.buffer(point, item.cartier_rayon, { units: 'kilometers' }); // 0.5 km radius
            const polygonCoords = buffered.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);
            //setPolygon(polygonCoords);
            return {coordinates: polygonCoords,cartId: item.cartier_id, color: item.nom_etat,describe:item.cartier_describe,cartname:item.cartier_name};
            //console.log("polygone coord :",polygonCoords)
      });
      setPolygon(newpolygone);
      }catch (error) {
        console.error('Erreur lors de la récupération des cartiers:', error);
      }
};
  const getPostdetail = async () =>{
    try {
      const postresult = await axios.get("http://localhost:8080/getAllPostData");
      setPostDetail(postresult.data);
      console.log(PostDetail);
    }catch(error){
       console.error(error);
    }

  }

  useEffect(() => {
      if (isPolling) {
        const interval = setInterval(() => {
          getCartierdetail();
          getPostdetail();
        }, 5000); // Intervalle de 5 secondes pour vérifier les nouvelles données
        // Nettoyage à la désinstallation du composant
        return () => clearInterval(interval);
      }
      }, [isPolling]); // isPolling est la dépendance

  return (
    <div>
      {loginData&&(
      <IconButton color="primary" aria-label="menu" onClick={handleMenuClick} sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
        <MenuIcon />
      </IconButton>)}
      <Drawer anchor="left" open={isLeftBarOpen} onClose={() => setIsLeftBarOpen(false)}>
       
      <List >
        {loginData&&!isPost &&
        (
          <>
          <ListItem button onClick={handlePublish}>
            <ListItemIcon>
              <PublishIcon />
            </ListItemIcon>
            <ListItemText primary={loginData.user_id} />
          </ListItem>
          <ListItem button onClick={handleCreatePolygon}>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Créer un polygone" />
          </ListItem>
          <ListItem button onClick={handleLocationSelect}>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="selection de location" />
          </ListItem>
        </>
        )}
      </List>
      </Drawer>
      <MapContainer ref={ref} zoomControlPosition="bottomleft" zoomControl={false}  center={center} zoom={zoom} style={{ height: '100vh', ...cursorStyle }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedLocation && (
          <Marker position={selectedLocation}>
            <Popup>
              <div>            
              <div>
              <Typography>
              Coordonnées sélectionnées :<br />
              Latitude : {selectedLocation.lat.toFixed(4)}<br />
              Longitude : {selectedLocation.lng.toFixed(4)}
              </Typography>
            </div>
            <div>
              <Button variant="contained" onClick={toggleCartierPolygone} size="small" sx={{borderRadius:'16px',backgroundColor:'green' ,left:-5 }}>Marqué la quartier</Button>
              <Button variant="contained" onClick={toggleFloatingCard} size="small" sx={{borderRadius:'16px',backgroundColor:'green' ,right:-10}}>Poste</Button>
            </div>
            </div>
            </Popup>
          </Marker>
        )}
        {PostDetail.map((item) => (
          <Marker key={item.post_id} position={[item.lat,item.lng]} icon={customIcon}>
            <Popup>
              <div>
                  <Rating precision={0.5} size="large"
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                <ImageList variant="masonry" cols={3} gap={8}>
                  {item["image"].map((items) => (
                    <ImageListItem key={items.image_name}>
                      <img
                        srcSet={`${'UploadFile/'.concat(items.image_name)}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${'UploadFile/'.concat(items.image_name)}?w=248&fit=crop&auto=format`}
                        //alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                    
                  ))}
                </ImageList>
              </div>
              <p>{item.description}</p>
              
              <Link component="button"  sx={{ color: 'rgb(130,202,250)',left:1}} variant="body2" onClick={handlePostOpen}  color="inherit">
                détailles>>
              </Link>
            </Popup>
          </Marker>
        ))}
        
        <MapWithClickHandler isSelectingLocation={isSelectingLocation} onSelectLocation={handleSelectLocation} />
        {!isSelectingLocation&&polygon.map((polygons, index) => (
          <Polygon key={index} eventHandlers={{click: () =>handleClickpoligone(polygons)}} pathOptions={{weight:1, color:polygons.color}} positions={polygons.coordinates} >
            <Popup>
              {polygons.cartname}<br/>----------------<br/>

              <div>{polygons.color}</div>
            </Popup>
          </Polygon>
        ))}
        {isFloatingCardVisible && (
        <FloatingCard
          title="Carte Flottante"
          content="Ceci est une carte flottante."
          onClose={toggleFloatingCard}
          lng={selectedLocation.lng}
          lat={selectedLocation.lat}
          userId={loginData.user_id}

        />

        
      )}{isCartierPolygone&&(
        <CartierPolygone
          onClose={toggleCartierPolygone}
          lng={selectedLocation.lng}
          lat={selectedLocation.lat}
          user_id={loginData.user_id}
        />)
      }
      <ZoomControl position="bottomright" />
      <RightContent 
        open={isRightContentOpen}
        content={cartierContent}
        onClose={handleCloseRightContent}
      />
      <PostDetailDialog 
        open={postOpen}
        onClose={handlePostOpen}
      />
      </MapContainer>
    </div>
  );
});
export default App;
