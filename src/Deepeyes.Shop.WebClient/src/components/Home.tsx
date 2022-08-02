
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';

function Home() {
  return (
    <div className="Home">
      <h1>Deep Eyes Project</h1>
      <Container>
      <Box sx={{display:"flex",m:1,p:1,justifyContent: 'space-around',flexWrap: 'wrap',alignContent: 'center'}}>
      <Card sx={{ maxWidth: 345 ,marginTop:'2rem'}}>
      <CardMedia
        component="img"
        height="240"
        image="src\assets\test.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Description
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <table className='tableHome'>
            <thead>
            <th>Name</th>
            <th>Valeur</th>
            {/* <th>Presence (sec)</th> */}
            <th>Probabilité</th>
            </thead>
            <tbody>
             <td>Main background</td>  
             <td>Landscape</td> 
         {/* <td>{precence}</td> */}
             <td>89.0123</td>
            </tbody>
        </table>
        </Typography>
      </CardContent> 
    </Card>

    {/* ------------------------------ */}
    <Card sx={{ maxWidth: 345 ,marginTop:'2rem'}}>
      <CardMedia
        component="img"
        height="240"
        image="src\assets\test2.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Description
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <table className='tableHome'>
            <thead>
            <th>Name</th>
            <th>Valeur</th>
            {/* <th>Presence (sec)</th> */}
            <th>Probabilité</th>
            </thead>
            <tbody>
             <td>Main background</td>  
             <td>Landscape</td> 
         {/* <td>{precence}</td> */}
             <td>89.0123</td>
            </tbody>
        </table>
        </Typography>
      </CardContent> 
    </Card>
    {/* ----------------------------------- */}


    {/* ------------------------------ */}
    <Card sx={{ maxWidth: 345 ,marginTop:'2rem'}}>
      <CardMedia
        component="img"
        height="240"
        image="src\assets\test3.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Description
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <table className='tableHome'>
            <thead>
            <th>Name</th>
            <th>Valeur</th>
            {/* <th>Presence (sec)</th> */}
            <th>Probabilité</th>
            </thead>
            <tbody>
             <td>Main background</td>  
             <td>Landscape</td> 
         {/* <td>{precence}</td> */}
             <td>89.0123</td>
            </tbody>
        </table>
        </Typography>
      </CardContent> 
    </Card>
    {/* ----------------------------------- */}
    {/* ------------------------------ */}
    <Card sx={{ maxWidth: 345,marginTop:'2rem' }}>
      <CardMedia
        component="img"
        height="240"
        image="src\assets\test4.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Description
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <table className='tableHome'>
            <thead>
            <th>Name</th>
            <th>Valeur</th>
            {/* <th>Presence (sec)</th> */}
            <th>Probabilité</th>
            </thead>
            <tbody>
             <td>Main background</td>  
             <td>Landscape</td> 
         {/* <td>{precence}</td> */}
             <td>89.0123</td>
            </tbody>
        </table>
        </Typography>
      </CardContent> 
    </Card>
    {/* ----------------------------------- */}
    
    
    </Box> 
    </Container>
    </div>
  )
}
export default Home