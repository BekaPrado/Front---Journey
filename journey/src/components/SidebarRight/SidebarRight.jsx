// src/components/SidebarRight/SidebarRight.jsx
import React from "react";
import { FaAngleRight, FaAngleLeft, FaUserCircle } from "react-icons/fa";

// Dados Mock (simulando a sidebar direita do exemplo)
const mockOnlineUsers = [
    { name: "Maren Maureen", id: "1094882001", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Jennifer Jane", id: "1094672000", avatar: "https://i.pravatar.cc/150?img=2" },
    { name: "Ryan Herwinds", id: "1094342003", avatar: "https://i.pravatar.cc/150?img=3" },
    { name: "Kierra Culhane", id: "1094662002", avatar: "https://i.pravatar.cc/150?img=4" },
];

const renderCalendar = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = [
        null, 1, 2, 3, 4, 5, 6, 
        7, 8, 9, 10, 11, 12, 13, 
        14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25, 26, 27, 
        28, 29, 30
    ];
    
    // Datas de destaque conforme a imagem de referência (image_78e503.jpg)
    const highlightDates = [13, 14, 22]; 
    const today = 11; 
    
    return (
        <div className="static-calendar">
            <div className="cal-header">
                <span>Nov 2020</span>
                <div className="cal-nav">
                    <button aria-label="Anterior"><FaAngleLeft size={16}/></button>
                    <button aria-label="Próximo"><FaAngleRight size={16}/></button>
                </div>
            </div>
            <div className="cal-days-grid">
                {/* O grid começa a partir de segunda-feira na imagem */}
                {days.map(d => <span key={d} className="cal-day">{d}</span>)} 
                
                {dates.map((date, index) => (
                    <span 
                        key={index} 
                        className={`cal-date ${date === today ? 'active' : ''} ${highlightDates.includes(date) ? 'highlight' : ''}`}
                        // Ajusta o início do dia 1 de novembro para ser no Domingo (index 0) 
                        style={{ gridColumnStart: date === 1 ? 7 : 'auto' }} 
                    >
                        {date}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function SidebarRight({ userImage, userName, userId, goToProfile }) {
    return (
        <div className="sidebar-right">
            {/* PERFIL (Topo da Sidebar Direita) */}
            <div className="profile-section-right">
                <div className="user-info-right">
                    <div className="name">{userName}</div>
                    <div className="id">{userId}</div>
                </div>
                {userImage ? (
                  <img 
                      src={userImage} 
                      alt="Perfil" 
                      onClick={goToProfile}
                      className="avatar-right"
                  />
                ) : (
                    <FaUserCircle size={35} className="avatar-right" onClick={goToProfile}/>
                )}
            </div>
            
            {/* CALENDÁRIO */}
            <div className="calendar-section">
                {renderCalendar()}
            </div>
            
            {/* ONLINE USERS */}
            <div className="online-users-section">
                <div className="header">
                    <h4>Online Users</h4>
                    <span className="see-all">See all</span>
                </div>
                
                {mockOnlineUsers.map(u => (
                    <div className="online-user-item" key={u.id}>
                        <div className="info">
                            <img src={u.avatar} alt={u.name} className="avatar-right-user" />
                            <div>
                                <div className="name">{u.name}</div>
                                <div className="id">{u.id}</div>
                            </div>
                        </div>
                        <div className="status-dot" />
                    </div>
                ))}
            </div>
        </div>
    );
}