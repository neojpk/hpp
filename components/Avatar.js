const Avatar = ({ name, role, votes }) => {
  return (
    <li className="participant-item">
      <div className="profile-pic_container">
        <img src="images/owner-picture.png" alt="Owner's Profile Picture" />
        <img
          src="images/owner-icon.svg"
          alt="Owner Icon"
          className="owner-icon"
        />
      </div>

      <div className="participant-name-votes">
        <div className="participant-name-role">
          {/* Utiliza los props 'name' y 'role' para reemplazar los valores estáticos */}
          <h6 className="participant-name">{name}</h6>
          <p className="participant-role">{role}</p>
        </div>
        {/* Utiliza el prop 'votes' para mostrar la cantidad de votos */}
        <div className="participant-votes">{votes}</div>
      </div>
    </li>
  );
};

export default Avatar;
