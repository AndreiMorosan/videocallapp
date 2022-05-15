import React,{Component} from 'react';
import './App.css';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import WelcomeText from './components/WelcomeText/WelcomeText';
import Register from './components/Register/Register';
import RegisterText from './components/RegisterText/RegisterText';
import AppVideo from './components/AppBar/AppBar';

import VideoPlayer from './components/VideoPlayer/VideoPlayer';


import {useEffect} from 'react';

const particleOptions = {
  particles: {
    number: {
      value:215,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      enable_auto : true
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      }
    }
  }
}




class App extends Component {

	constructor() {
		super();
		this.state={
			input: '',
			imageUrl: '',

			route: 'signin',

      user: {
     
      id : '',

     name: '',
  
     email: '',

     entries: 0,

    joined: new Date() 

      }

		}
	}


 onLoadUser = (data) =>{
  this.setState({user: {
       id : data.id,

     name: data.name,
  
     email: data.email,

     entries: data.entries,

    joined: data.joined
  }})
 }

	onInputChange = (event) => {
		this.setState({input:event.target.value});
	}

	onRouteChange = (route) =>
	{
        this.setState({route : route});
	}




	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});

    fetch('http://localhost:8000/image',{
      method: 'put',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then(response => response.json()).then(count => {
      this.setState(Object.assign(this.state.user,{entries:count}));
    })
	}


  render(){

  return (
    <div className="App">

     <Particles className='particles' params={particleOptions}/>

     

     { this.state.route === 'home' ?
     
     <div>
        <Navigation onRouteChange={this.onRouteChange} />

     <Logo />

    
      <AppVideo />
    

     <FaceRecognition imageUrl={this.state.imageUrl} />
     </div>:(
         this.state.route=== 'signin' ?

        <div>
       <WelcomeText />
     <SignIn onRouteChange={this.onRouteChange}  onLoadUser={this.onLoadUser}/>
       </div>:

       <div>

    <RegisterText  onRouteChange={this.onRouteChange} />
    <Register onRouteChange={this.onRouteChange}  onLoadUser={this.onLoadUser}/>
       </div>
    
       

      	)
 }
    </div>

  );
}
}

export default App;
