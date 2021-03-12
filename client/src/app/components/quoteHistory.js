import {React, useState,Component} from 'react'
import axios from 'axios'
import "./style.css"
import HeaderNav from './headerNav';
import {Container} from 'react-bootstrap';
import moment from "moment";
export default class GetHistory extends Component{
    constructor(props){
        super(props);
        this.state={
            id:null,
            fuel:""
        }
    }
    componentDidMount(){
        const profile=this.props.match.params.profile
        axios.get(`http://127.0.0.1:8000/api/fuel/gethist/${profile}`)
        .then(res=>{
            this.setState({fuel:res.data})
            //console.log(res)
        })
        .catch(err=>{
            console.log(err.response)
        })
    }
    search(){   
        
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[0];
              
              if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }       
            }
          

    }
    calculateFirst(state,gallon)
    {
        if(state!=='TX' && gallon>1000) return (((0.04-0+0.02+0.1)*1.5)+1.5)*gallon
        else if(state!=='TX'&& gallon<1000) return ((0.04-0+0.03+0.1)*1.5)+1.5*gallon

        else if(state==='TX' && gallon>1000) return (((0.02-0+0.02+0.1)*1.5)+1.5)*gallon
        else if(state==='TX'&& gallon<1000) return ((0.02-0+0.03+0.1)*1.5)+1.5*gallon
    }

    calculateSecond(state,gallon)
    {
        if(state!=='TX' && gallon>1000) return (((0.04-0.01+0.02+0.1)*1.5)+1.5)*gallon
        else if(state!=='TX'&& gallon<1000) return ((0.04-0.01+0.03+0.1)*1.5)+1.5*gallon

        else if(state==='TX' && gallon>1000) return (((0.02-0.01+0.02+0.1)*1.50)+1.50)*gallon
        else if(state==='TX'&& gallon<1000) return (((0.02-0.01+0.03+0.1)*1.50)+1.50)*gallon
    }
    render(){
        const fuels=this.state.fuel
        return(
            <>
            <HeaderNav/>
            <Container>
            <input type="text" id="myInput"  onChange={this.search} placeholder="Search for names.."/>

            <table id="myTable">
                <tr className="header">
                    <th style={{width:"10%"}}>slug</th>
                    <th style={{width:"10%"}}>Name</th>
                    <th style={{width:"10%"}}>Date</th>
                    <th style={{width:"10%"}}>Gallon</th>
                    <th style={{width:"10%"}}>Address</th>
                    <th style={{width:"10%"}}>Address 2</th>
                    <th style={{width:"10%"}}>City</th>
                    <th style={{width:"10%"}}>State</th>
                    <th style={{width:"10%"}}>Zipcode</th>
                    <th style={{width:"10%"}}>Total</th>
                </tr>
                {fuels&&fuels.length>0&&fuels.map((i,index)=>
                    <tr>
                        <td>{i.slug}</td>
                        <td>{i.histories.fullname}</td>
                        
                        <td>{moment(i.date).format("MM Do YYYY")}</td>
                        <td>{i.gallon}</td>
                        <td>{i.histories.address1}</td>
                        <td>{i.histories.address2}</td>

                        <td>{i.histories.city}</td>
                        <td>{i.histories.state}</td>
                        <td>{i.histories.zipcode}</td>
                        
                        <td>{
                                index===0?(this.calculateFirst(i.histories.state,i.gallon)):(this.calculateSecond(i.histories.state,i.gallon))
                                
                            }</td>
                    </tr>
                    
                    )}
                
                
            </table>
            </Container>
            </>
        )
    }


}
