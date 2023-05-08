import styles from '../../styles/layout.module.css'



export default function layout({children}){
    return(
        <div className="flex h-screen bg-green-200">
           <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">

                <div className={styles.imgStyle}>
                    <div className={styles.cartoonImg}></div>
                    <div className={styles.cartoonImg1}></div>
                    <div className={styles.cartoonImg2}></div>
               

                    
                    </div>
                    
                
                <div className="right flex flex-col justify-evenly ">
                    <div className="text-center py-10">
                        {children}
                    </div>
                    </div>
                    
                
            </div></div>
            
           
       
    )
}