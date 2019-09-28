function SELECT(connection){
	connection.connect();
//接著就可以開始進行查詢
	connection.query('SELECT cname FROM commodity',function(error, rows, fields){
    //檢查是否有錯誤
    if(error){
        throw error;
    }
    console.log('The solution is: ', rows[0]); 
});
}
function I(connection){

	connection.connect();

	
  var  addSql = 'INSERT INTO commodity(Camount,Ctext,Cprice,Cname) VALUES(?,?,?,?)';
  var  addSqlParams = ['10','這叫測試2','21000000','支那2'];
    //增
    dbconnection.query(addSql,addSqlParams,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }        
     
           console.log('--------------------------INSERT----------------------------');
           //console.log('INSERT ID:',result.insertId);        
           console.log('INSERT ID:',result);        
           console.log('-----------------------------------------------------------------\n\n');  
    });
}