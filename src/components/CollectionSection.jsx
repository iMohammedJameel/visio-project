import React from 'react'

const collections = [
  { name: "Juniors Set", image: '/assets/images/C4.png' },
  { name: "Men's Set",   image: '/assets/images/C5.png' },
  { name: "Women's Set", image: '/assets/images/C6.png' },
]

function CollectionSection() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="font-playfair fw-bold mb-4">Shop Collection</h2>
        <div className="row g-3">

          {/* Left - Juniors Set */}
          <div className="col-md-6">
            <div className="rounded-3 overflow-hidden d-flex flex-column"
              style={{backgroundColor:'#F3F5F7', cursor:'pointer', height:412, transition:'box-shadow .25s, transform .25s'}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 8px 30px rgba(0,0,0,.1)'; e.currentTarget.style.transform='translateY(-3px)'}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'}}>
              <div style={{flex:1, padding:'16px', minHeight:0}}>
                <img src={collections[0].image} alt={collections[0].name}
                  style={{width:'100%', height:'100%', objectFit:'contain'}} />
              </div>
              <div className="px-3 pb-3">
                <h5 className="font-playfair fw-bold mb-1">{collections[0].name}</h5>
                <button className="btn btn-link text-dark small text-decoration-none fw-medium p-0" style={{borderBottom:'1px solid #000', borderRadius:0}}>Collections →</button>
              </div>
            </div>
          </div>

          {/* Right - Men's & Women's */}
          <div className="col-md-6 d-flex flex-column gap-3">
            {collections.slice(1).map(col => (
              <div key={col.name} className="rounded-3 overflow-hidden"
                style={{backgroundColor:'#F3F5F7', cursor:'pointer', height:200, transition:'box-shadow .25s, transform .25s'}}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 8px 30px rgba(0,0,0,.1)'; e.currentTarget.style.transform='translateY(-3px)'}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'}}>
                <div className="d-flex h-100">
                  <div className="d-flex flex-column justify-content-end p-3" style={{flex:1}}>
                    <h5 className="font-playfair fw-bold mb-1">{col.name}</h5>
                    <button className="btn btn-link text-dark small text-decoration-none fw-medium p-0" style={{borderBottom:'1px solid #000', borderRadius:0, width:'fit-content'}}>Collections →</button>
                  </div>
                  <div style={{width:'55%', padding:'8px'}}>
                    <img src={col.image} alt={col.name}
                      style={{width:'100%', height:'100%', objectFit:'contain'}} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
export default CollectionSection