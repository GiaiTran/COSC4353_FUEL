import {React, useState,Component} from 'react'
import axios from 'axios'
import "./style.css"
import HeaderNav from './headerNav';
import {Container,Card} from 'react-bootstrap';
import moment from "moment";
import $ from "jquery"
import "./style.css"
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default class GetHistory extends Component{
    constructor(props){
        super(props);
        this.state={
            id:null,
            fuel:[],
            sums:''
        }
    }
    
    componentDidMount(){
        const profile=this.props.match.params.profile
        
        axios.get(`http://127.0.0.1:8000/api/fuel/gethist/${profile}`)
        .then(res=>{
            this.setState({fuel:res.data})
            console.log(res)
            
        })
        .catch(err=>{
            console.log(err.response)
            
        })
        this.total()
       
       
    }
    total(){
        
        window.addEventListener('load', function () {
            var sum=0
            var eles = document.getElementsByClassName('price');
            var arr=[]
            for (var i=0;i<eles.length;i++){
                arr.push(eles[i].innerHTML.slice(1))
                
            }
            for(var j=0;j<arr.length;j++){
                
                const rep=arr[j].replace(/,/g, "")
                sum=sum+parseInt(rep)
                
                
            }
           return document.getElementById("val").innerHTML = "Total: $"+numberWithCommas(sum)
        })
    }
    
    calculateFirst(state,gallon)
    {
        if(state!=='TX' && gallon>1000) return '$'+numberWithCommas((((0.04-0+0.02+0.1)*1.5)+1.5)*gallon)
        else if(state!=='TX'&& gallon<1000) return '$'+numberWithCommas((((0.04-0+0.03+0.1)*1.5)+1.5)*gallon)

        else if(state==='TX' && gallon>1000) return '$'+numberWithCommas((((0.02-0+0.02+0.1)*1.5)+1.5)*gallon)
        else if(state==='TX'&& gallon<1000) return '$'+numberWithCommas((((0.02-0+0.03+0.1)*1.5)+1.5)*gallon)
    }

    calculateSecond(state,gallon)
    {
        if(state!=='TX' && gallon>1000) return '$'+numberWithCommas((((0.04-0.01+0.02+0.1)*1.5)+1.5)*gallon)
        else if(state!=='TX'&& gallon<1000) return '$'+numberWithCommas((((0.04-0.01+0.03+0.1)*1.5)+1.5)*gallon)

        else if(state==='TX' && gallon>1000) return '$'+numberWithCommas((((0.02-0.01+0.02+0.1)*1.50)+1.50)*gallon)
        else if(state==='TX'&& gallon<1000) return '$'+numberWithCommas((((0.02-0.01+0.03+0.1)*1.50)+1.50)*gallon)
    }
   
    render(){
        const fuels=this.state.fuel
        console.log(fuels.length)
        return(
            <>
            <HeaderNav/>
            <Container>
            <Card style={{marginTop:"20px",textAlign:"center",marginLeft:"110px"}}>
        <Card.Header as="h5">Gas Report</Card.Header>
            <Card.Body>
                <Card.Title>Total User Purchased Gas</Card.Title>
                <Card.Text>
                        <div id="val">
                            
                        </div>
                </Card.Text>
                
            </Card.Body>
        </Card>

            <table id="myTable" style={{marginTop:"20px",textAlign:"center",marginLeft:"60px",marginBottom:"50px"}}>
                <tr className="header">
                    <th style={{width:"10%"}}>ID</th>
                    <th style={{width:"10%"}}>Name</th>
                    <th style={{width:"10%"}}>Address</th>
                    <th style={{width:"10%"}}>Address 2</th>
                    <th style={{width:"10%"}}>City</th>
                    <th style={{width:"10%"}}>State</th>
                    <th style={{width:"10%"}}>Zipcode</th>
                    <th style={{width:"10%"}}>Date</th>
                    <th style={{width:"10%"}}>Gallon</th>
                    <th style={{width:"10%"}}>Price</th>
                </tr>
                {fuels.length===0?(<a href="/create/gas">Create Gas</a>):(
                fuels.map((i,index)=>
                    <tr>
                        <td>{i.slug}</td>
                        <td>{i.histories.fullname}</td>
                        
                        
                        
                        <td >{i.histories.address1}</td>
                        <td>{i.histories.address2}</td>

                        <td>{i.histories.city}</td>
                        <td>{i.histories.state}</td>
                        <td>{i.histories.zipcode}</td>
                        <td>{moment(i.date).format("MM Do YYYY")}</td>
                        <td>{i.gallon}</td>
                        {(index+1)===fuels.length?(<td className="price" style={{backgroundColor:"yellow"}}>{
                                index===0?(this.calculateFirst(i.histories.state,i.gallon)):(this.calculateSecond(i.histories.state,i.gallon))
                                
                            }</td>):(<td className="price">{
                                index===0?(this.calculateFirst(i.histories.state,i.gallon)):(this.calculateSecond(i.histories.state,i.gallon))
                                
                            }</td>)}
                        
                    </tr>
                    
                    ))}
                
                
            </table>
            </Container>
            </>
        )
    }


}
