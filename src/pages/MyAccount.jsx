import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const NAV_ITEMS = ['Account', 'Address', 'Orders', 'Wishlist', 'Log Out']

const orders = [
  { id: '#3456_768', date: 'Mar 22, 2026', status: 'Delivered', price: '$1234.00' },
  { id: '#3456_980', date: 'Mar 22, 2026', status: 'Delivered', price: '$345.00' },
  { id: '#3456_120', date: 'Mar 24, 2026',  status: 'Delivered', price: '$2345.00' },
  { id: '#3456_030', date: 'Mar 25, 2026',  status: 'Delivered', price: '$845.00' },
]

const wishlistItems = [
  { id: 1, name: "Men's Golf Glove",   color: 'White', price: 18.02, image: '/assets/images/1.png' },
  { id: 2, name: "Golf Polo Shirt",    color: 'Black', price: 24.99, image: '/assets/images/2.png' },
  { id: 3, name: 'Golf Glove Cadet',   color: 'White', price: 43.99, image: '/assets/images/3.png' },
  { id: 4, name: 'Golf Bag All Black', color: 'Black', price: 305.0, image: '/assets/images/4.png' },
]

const DEFAULT_ADDR = {
  name: 'Sofia Havertz',
  phone: '(+1) 234 567 890',
  address: '345 Long Island, NewYork, United States'
}

function EditModal({ type, data, onSave, onClose }) {
  const [form, setForm] = useState({ ...data })

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="addr-modal-overlay" onClick={onClose}>
      <div className="rounded-4 p-4 w-100" style={{ maxWidth: 460, background: '#fff' }} onClick={e => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="font-playfair fw-bold mb-0">Edit {type}</h5>
          <button className="btn btn-link text-muted p-0" onClick={onClose}><i className="bi bi-x-lg"></i></button>
        </div>
        <div className="mb-3">
          <label className="text-uppercase text-muted fw-semibold small d-block mb-1">Full Name</label>
          <input className="form-control" placeholder="Full name" value={form.name} onChange={e => handleChange('name', e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="text-uppercase text-muted fw-semibold small d-block mb-1">Phone</label>
          <input className="form-control" placeholder="Phone number" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="text-uppercase text-muted fw-semibold small d-block mb-1">Address</label>
          <input className="form-control" placeholder="Full address" value={form.address} onChange={e => handleChange('address', e.target.value)} />
        </div>
        <button className="btn btn-dark w-100 py-2 mt-2 fw-semibold" onClick={() => onSave(type, form)}>Save Address</button>
      </div>
    </div>
  )
}

function MyAccount() {
  const navigate = useNavigate()
  const fileRef  = useRef(null)
  const { addItem, openCart } = useCart()

  const [activeTab, setActiveTab] = useState('Account')
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/120?img=47')
  const [saved, setSaved] = useState(false)
  const [editType, setEditType] = useState(null)
  const [addresses, setAddresses] = useState({
    'Billing Address': { ...DEFAULT_ADDR },
    'Shipping Address': { ...DEFAULT_ADDR }
  })
  const [form, setForm] = useState({
    firstName: '', lastName: '', displayName: '',
    email: '', oldPassword: '', newPassword: '', repeatPassword: ''
  })

  function handleFormChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSave(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleNav(item) {
    if (item === 'Log Out') {
      navigate('/login')
      return
    }
    setActiveTab(item)
  }

  function handleAvatar(e) {
    const file = e.target.files[0]
    if (file) setAvatar(URL.createObjectURL(file))
  }

  // Sidebar
  const Sidebar = () => (
    <div className="bg-light rounded-4 p-4 text-center">
      {/* Avatar */}
      <div className="avatar-wrap mb-3 mx-auto" style={{display:'inline-block'}}>
        <img src={avatar} alt="avatar" className="avatar-img"/>
        <button className="avatar-btn" onClick={()=>fileRef.current.click()}>
          <i className="bi bi-camera-fill" style={{fontSize:12}}></i>
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="d-none" onChange={handleAvatar}/>
      </div>
      <div className="fw-bold mb-3">Sofia Havertz</div>

      {/* Mobile dropdown */}
      <div className="d-md-none mb-2">
        <select className="form-select" value={activeTab} onChange={e=>handleNav(e.target.value)}>
          {NAV_ITEMS.map(i=><option key={i}>{i}</option>)}
        </select>
      </div>

      {/* Desktop nav */}
      <div className="d-none d-md-flex flex-column text-start">
        {NAV_ITEMS.map(item=>(
          <button key={item}
            className={`btn btn-link text-decoration-none text-start border-bottom py-3 px-0 ${activeTab===item?'text-dark fw-bold':'text-muted'} ${item==='Log Out'?'text-secondary mt-1':''}`}
            style={{borderRadius:0}}
            onClick={()=>handleNav(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="py-5">
      <div className="container">
        <h1 className="font-playfair fw-bold text-center mb-5" style={{fontSize:48}}>My Account</h1>

        <div className="row g-4 align-items-start">
          {/* Sidebar */}
          <div className="col-12 col-md-3">
            <Sidebar/>
          </div>

          {/* Content */}
          <div className="col-12 col-md-9">

            {/* Account Tab */}
            {activeTab==='Account' && (
              <form onSubmit={handleSave}>
                {/* Account Details */}
                <div className="mb-4">
                  <h4 className="font-playfair fw-bold mb-4">Account Details</h4>
                  <div className="row g-3 mb-3">
                    <div className="col-12">
                      <label className="text-uppercase text-muted fw-semibold small d-block mb-1">First Name <span className="text-danger">*</span></label>
                      <input className="form-control" placeholder="First name" value={form.firstName} onChange={e => handleFormChange('firstName', e.target.value)} required />
                    </div>
                    <div className="col-12">
                      <label className="text-uppercase text-muted fw-semibold small d-block mb-1">Last Name <span className="text-danger">*</span></label>
                      <input className="form-control" placeholder="Last name" value={form.lastName} onChange={e => handleFormChange('lastName', e.target.value)} required />
                    </div>
                    <div className="col-12">
                      <label className="text-uppercase text-muted fw-semibold small d-block mb-1">Display Name <span className="text-danger">*</span></label>
                      <input className="form-control" placeholder="Display name" value={form.displayName} onChange={e => handleFormChange('displayName', e.target.value)} required />
                      <small className="text-muted fst-italic mt-1 d-block">This will be how your name will be displayed in the account section and in reviews</small>
                    </div>
                    <div className="col-12">
                      <label className="text-uppercase text-muted fw-semibold small d-block mb-1">Email <span className="text-danger">*</span></label>
                      <input className="form-control" placeholder="Email" type="email" value={form.email} onChange={e => handleFormChange('email', e.target.value)} required />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <h4 className="font-playfair fw-bold mb-4">Password</h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="text-uppercase text-muted fw-semibold small d-block mb-1">Old Password</label>
                      <input className="form-control" type="password" placeholder="Old password" value={form.oldPassword} onChange={e => handleFormChange('oldPassword', e.target.value)} />
                    </div>
                    <div className="col-12">
                      <label className="text-uppercase text-muted fw-semibold small d-block mb-1">New Password</label>
                      <input className="form-control" type="password" placeholder="New password" value={form.newPassword} onChange={e => handleFormChange('newPassword', e.target.value)} />
                    </div>
                    <div className="col-12">
                      <label className="text-uppercase text-muted fw-semibold small d-block mb-1">Repeat New Password</label>
                      <input className="form-control" type="password" placeholder="Repeat new password" value={form.repeatPassword} onChange={e => handleFormChange('repeatPassword', e.target.value)} />
                    </div>
                  </div>
                </div>

                <button type="submit" className={`btn fw-semibold px-4 py-2 ${saved?'btn-success':'btn-dark'}`}>
                  {saved?'✓ Saved!':'Save changes'}
                </button>
              </form>
            )}

            {/* Address Tab */}
            {activeTab==='Address' && (
              <div>
                <h4 className="font-playfair fw-bold mb-4">Address</h4>
                <div className="row g-3">
                  {Object.entries(addresses).map(([type,data])=>(
                    <div key={type} className="col-12 col-md-6">
                      <div className="border rounded-3 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="fw-bold">{type}</span>
                          <button className="btn btn-link text-muted p-0 small fw-semibold" onClick={()=>setEditType(type)}>
                            <i className="bi bi-pencil me-1"></i>Edit
                          </button>
                        </div>
                        <p className="small text-muted mb-1">{data.name}</p>
                        <p className="small text-muted mb-1">{data.phone}</p>
                        <p className="small text-muted mb-0">{data.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab==='Orders' && (
              <div>
                <h4 className="font-playfair fw-bold mb-4">Orders History</h4>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="text-muted small text-uppercase">
                      <tr>
                        <th className="fw-semibold border-0 pb-3">Number ID</th>
                        <th className="fw-semibold border-0 pb-3">Dates</th>
                        <th className="fw-semibold border-0 pb-3">Status</th>
                        <th className="fw-semibold border-0 pb-3">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td className="fw-semibold small">{o.id}</td>
                          <td className="small text-muted">{o.date}</td>
                          <td><span className="badge bg-success bg-opacity-10 text-success fw-semibold">{o.status}</span></td>
                          <td className="fw-bold small">{o.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab==='Wishlist' && (
              <div>
                <h4 className="font-playfair fw-bold mb-4">Your Wishlist</h4>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="text-muted small text-uppercase">
                      <tr>
                        <th className="border-0 pb-3" style={{width:32}}></th>
                        <th className="fw-semibold border-0 pb-3">Product</th>
                        <th className="fw-semibold border-0 pb-3">Price</th>
                        <th className="fw-semibold border-0 pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlistItems.map(item => (
                        <tr key={item.id}>
                          <td><button className="btn btn-link text-muted p-0"><i className="bi bi-x-lg small"></i></button></td>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <div className="table-img"><img src={item.image} alt={item.name} /></div>
                              <div>
                                <div className="fw-semibold small">{item.name}</div>
                                <div className="text-muted small">Color: {item.color}</div>
                              </div>
                            </div>
                          </td>
                          <td className="fw-bold small">${item.price.toFixed(2)}</td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm fw-semibold"
                              onClick={() => { addItem({ id: item.id, name: item.name, color: item.color, price: item.price, image: item.image }); openCart() }}>
                              Add to cart
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Address Modal */}
      {editType && (
        <EditModal
          type={editType}
          data={addresses[editType]}
          onSave={(type,data)=>{ setAddresses(p=>({...p,[type]:data})); setEditType(null) }}
          onClose={()=>setEditType(null)}
        />
      )}
    </div>
  )
}
export default MyAccount
