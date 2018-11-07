const recent_url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const all_time_url = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
var html = '';

// CURRENT BUG:
// UNABLE TO LOAD ALL-TIME LEADERS PROPERLY.

class Create_Leaderboard extends React.Component{
  
  constructor(props){
    super(props);
  }

  //Setting the defaut.
  
  my_results(data){
    this.setState({
      data: data
    });
    // Now needs to clear the html flawlessly during each switch.
    html == '';
    console.log(this.state.data[0].username);
    for(var i = 0; i <= 99; i++){
      html += '<tr><td>'+ (i+1) +'</td>';
      html += '<td><img src="'+this.state.data[i].img + '" style="width:3em;height:3em"></td>';
      html += '<td><a href="https://freecodecamp.com/'+this.state.data[i].username+'">'+this.state.data[i].username + '</a></td>';
      html += '<td>'+this.state.data[i].recent + '</td>';
      html += '<td>'+this.state.data[i].alltime + '</td></tr>';
    }
  }
  
  // click + detect sort change.
  toggleSortAllTime(){
    this.get_data('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
    html = '';
  }
  
  toggleSortRecent(){
    this.get_data('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
    html = '';
  }
  
// TESTING 1 2 3
  
  
  get_data(api_url){
    $.ajax({
      type: 'GET',
      url: api_url,
      dataType: 'json',
      success: function(data){
        console.log("success");
        this.my_results(data);
      }.bind(this)
    });
  }
  
  // sort via recent
  
  // sort via all-time
  
  
  render(){
    // First call. 
    return(
      <section id="theTable">
        <h3>Top Campers</h3> <br />
        <b>Double click: </b>
        <button className="btn btn-info" onClick={() => this.toggleSortRecent()}>Recent</button>
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn btn-info" onClick={() => this.toggleSortAllTime()}>All Time</button>
        <table className="table table-bordered table-responsive">
          <tr>
            <td>id</td>
            <td>image</td>
            <td>username</td>
            <td onClick={ () => this.toggleSortRecent()}>recent (30 days)</td>
            <td onClick={ () => this.toggleSortAllTime()}>All Time</td>
          </tr>
          <table dangerouslySetInnerHTML={{__html: html}} />
        </table>
      </section>
    )
  }
}


class Main extends React.Component{
  render(){
    return(
      <Create_Leaderboard />
    )
  }
}

ReactDOM.render(<Main />, document.body);
