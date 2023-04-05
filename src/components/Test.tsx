import React,{useEffect, useState} from 'react'
   
const Test = () => {


  const [data,setdata]=useState<string>('Solar porta potties utilize solar-powered lighting to prevent the need for electricity')
  return (
    <section className="port--types">
        <div className="grid--container">
            <div className="grid">
                <div className="grid----">
                    <div className="grid--wrapper">
                        <div className="port--types--top">
                            <div className="bold--heading--wrapper">
                                <h2>Types of Porta Potties</h2>
                            </div>
                            <div className="port--types-category--wrapper">
                                <div className="port--types--category--items">
                                
                                   
                                    <div className="port--types--category--item active--port--type" id="portcat--3">
                                        <div className="img--wrapper">
                                            <img src="./asstes/image/deluxe-flush--1.png"alt=""/>
                                        </div>
                                        <div className="content--wrapper">
                                            <a href="#" className="btn--arrow"></a>
                                            <p>
                                                {data}
                                            </p>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                            </div>
                        </div>
                        <div className="port--types--categorys">
                            <div className="port--types--categorys--list">
                                <div className="port--types--categorys--item" data-category="portcat--1">
                                    <h3 onClick={()=>setdata('Lorem Ipsum is simply dummy text of the printing and typesetting industry')} >Standard</h3>
                                </div>
                                <div className="port--types--categorys--item" data-category="portcat--2">
                                    <h3 onClick={()=>setdata('Solar porta potties utilize solar-powered lighting to prevent the need for electricity')} >Standard With Sink</h3>
                                </div>
                                <div className="port--types--categorys--item active--item" data-category="portcat--3">
                                    <h3 onClick={()=>setdata('Lorem Ipsum is simply dummy text of the printing and typesetting industry')} >Flushing</h3>
                                </div>
                                <div className="port--types--categorys--item" data-category="portcat--4">
                                    <h3 onClick={()=>setdata('Solar porta potties utilize solar-powered lighting to prevent the need for electricity')} >Wheelchair Accessible</h3>
                                </div>
                                <div className="port--types--categorys--item" data-category="portcat--5">
                                    <h3 onClick={()=>setdata('Lorem Ipsum is simply dummy text of the printing and typesetting industry')} >Restroom Trailer</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Test