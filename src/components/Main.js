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
const data = [
  {
    id: 1,
    position: [-21.4435, 47.082],
    image: 'logo192.png',
    description: 'Maison à vendre',
  },
  {
    id: 2,
    position: [-21.4433, 47.0946],
    image: 'logo512.png',
    description: 'à vendre à Londres',
  },
  {
    id: 3,
    position: [53.343, -6.3],
    image: 'https://example.com/image3.jpg',
    description: ' vendre à Londres',
  },
];

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
    },
];
const quartiers = [
  {
    name: 'Quartier 1',
    coordinates: [
      [51.51, -0.1],
      [51.51, -0.12],
      [51.53, -0.12],
      [51.53, -0.1],
    ],
  },
  {
    name: 'Quartier 2',
    coordinates: [
      [51.49, -0.08],
      [51.49, -0.1],
      [51.51, -0.1],
      [51.51, -0.08],
    ],
  },
  {
    name: 'Quartier 3',
    coordinates: [
      [51.52, -0.09],
      [51.52, -0.11],
      [51.54, -0.11],
      [51.54, -0.09],
    ],
  },
];

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
  const [IsConnected, setIsConnected]=useState(false)
  const [cartierDetail,setCartierDetail] = useState([]);
  const [inputValue, setInputValue] = useState(false);
  const [isPolling, setIsPolling] = useState(true);
  const [isRightContentOpen,setIsRightcontentOpen]= useState(false);
  const [cartiedelailId,setCartierDetailId] = useState();
  const [cartierContent,setCartierContent] =useState([]);
  const container = window !== undefined ? () => window().document.body : undefined;

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
  const CircleLayer = ({ center, radius, steps }) => {
    const circles = [];
  
    for (let i = 0; i < steps; i++) {
      circles.push(
        <Circle
          center={center}
          radius={radius * (i + 1)}
          pathOptions={{ color: 'blue', opacity: 0.3 / (i + 1) }}
          key={i}
        />
      );
    }
  
    return <>{circles}</>;
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
    console.log('cartier: ',polygons.describe);
  }
  const getCartierdetail = async () =>{
    try{
      const cartier_result = await axios.get("http://localhost:8080/getcartier");
      //setCartierDetail(cartier_result.data);
      console.log("cartiet",cartier_result.data);
      const newpolygone = cartier_result.data.map((item)=>{
            console.log("latitude:",item.cartier_lat);
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

  useEffect(() => {
      if (isPolling) {
        const interval = setInterval(() => {
          getCartierdetail();
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
        {data.map((item) => (
          <Marker key={item.id} position={item.position} icon={customIcon}>
            <Popup>
              <div>
                  <Rating precision={0.1} size="large"
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                <ImageList variant="masonry" cols={3} gap={8}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                    
                  ))}
                </ImageList>
              </div>
              <p>{item.description}</p>
              
              <Link component="button"  sx={{ color: 'rgb(130,202,250)',left:1}} variant="body2"  color="inherit">
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
          coordone={[selectedLocation.lng,selectedLocation.lat]}

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
      </MapContainer>
    </div>
  );
});


export default App;
