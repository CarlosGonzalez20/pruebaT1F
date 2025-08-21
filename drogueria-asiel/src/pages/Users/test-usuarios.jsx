import React, { lazy, useState } from 'react';
import './test-usuarios.css';
const Navbar = lazy(() => import("../../components/navbar/navbar"));

function App() {
  const [currentToken, setCurrentToken] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [baseUrl, setBaseUrl] = useState('http://localhost:3000/usuarios');
  const [result, setResult] = useState(null);
  const [isError, setIsError] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);
  
  // Referencias a los inputs (podrías usar useState para cada campo también)
  const regNombreRef = React.useRef();
  const regEmailRef = React.useRef();
  const regPasswordRef = React.useRef();
  const loginEmailRef = React.useRef();
  const loginPasswordRef = React.useRef();
  const updateNombreRef = React.useRef();
  const userIdRef = React.useRef();
  const nuevoRolRef = React.useRef();

  // Función para mostrar resultados
  const showResult = (message, error = false) => {
    setResult(message);
    setIsError(error);
  };

  // Headers comunes
  const getHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': currentToken ? `Bearer ${currentToken}` : ''
    };
  };

  // Registrar usuario
  const registrar = async () => {
    try {
      const userData = {
        nombre: regNombreRef.current.value,
        email: regEmailRef.current.value,
        password: regPasswordRef.current.value
      };
      
      const response = await fetch(`${baseUrl}/registro`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      if (data.success) {
        showResult(data);
        loginEmailRef.current.value = userData.email;
        loginPasswordRef.current.value = userData.password;
      } else {
        showResult(data, true);
      }
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  // Login
  const login = async () => {
    try {
      const loginData = {
        email: loginEmailRef.current.value,
        password: loginPasswordRef.current.value
      };
      
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      if (data.success) {
        setCurrentToken(data.data.token);
        setCurrentUser(data.data.usuario);
        setTokenVisible(true);
        updateNombreRef.current.value = data.data.usuario.nombre;
        showResult(data);
      } else {
        showResult(data, true);
      }
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  // Verificar token
  const verificarToken = async () => {
    try {
      const response = await fetch(`${baseUrl}/perfil`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  // Obtener perfil
  const obtenerPerfil = async () => {
    try {
      const response = await fetch(`${baseUrl}/perfil`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      const data = await response.json();
      if (data.success) {
        setCurrentUser(data.data.usuario);
        showResult(data);
      } else {
        showResult(data, true);
      }
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  // Actualizar perfil
  const actualizarPerfil = async () => {
    try {
      const updateData = {
        nombre: updateNombreRef.current.value
      };
      
      const response = await fetch(`${baseUrl}/perfil`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  // Funciones de administración
  const obtenerTodosUsuarios = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/usuarios`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  const obtenerEstadisticas = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/estadisticas`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  const obtenerAdmins = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/administradores`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  const obtenerUsuarioPorId = async () => {
    try {
      const userId = userIdRef.current.value;
      const response = await fetch(`${baseUrl}/admin/usuario/${userId}`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  const obtenerHistorialRoles = async () => {
    try {
      const userId = userIdRef.current.value;
      const response = await fetch(`${baseUrl}/admin/usuario/${userId}/historial-rol`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  const actualizarRol = async () => {
    try {
      const userId = userIdRef.current.value;
      const nuevoRol = nuevoRolRef.current.value;
      
      const response = await fetch(`${baseUrl}/admin/usuario/${userId}/rol`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ nuevoRol })
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  const promoverAdmin = async () => {
    try {
      const userId = userIdRef.current.value;
      const response = await fetch(`${baseUrl}/admin/usuario/${userId}/promover`, {
        method: 'PATCH',
        headers: getHeaders()
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  const degradarUsuario = async () => {
    try {
      const userId = userIdRef.current.value;
      const response = await fetch(`${baseUrl}/admin/usuario/${userId}/degradar`, {
        method: 'PATCH',
        headers: getHeaders()
      });
      
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult('Error: ' + error.message, true);
    }
  };

  return (
    <div className="container">
      <Navbar />
      {/* Encabezado */}
      <h1>🔧 Panel de Prueba - API Usuarios DASA</h1>
      
      {/* Sección de Autenticación */}
      <div className="section">
        <h2>🔐 Autenticación</h2>
        
        <div className="form-group">
          <label htmlFor="baseUrl">URL Base de la API:</label>
          <input 
            type="text" 
            id="baseUrl" 
            defaultValue={baseUrl} 
            placeholder="http://localhost:3000/usuarios"
            onChange={(e) => setBaseUrl(e.target.value)}
          />
        </div>
        
        <h3>📝 Registro</h3>
        <div className="form-group">
          <label htmlFor="regNombre">Nombre:</label>
          <input 
            type="text" 
            id="regNombre" 
            placeholder="Tu nombre"
            ref={regNombreRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="regEmail">Email:</label>
          <input 
            type="email" 
            id="regEmail" 
            placeholder="tu@email.com"
            ref={regEmailRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="regPassword">Contraseña:</label>
          <input 
            type="password" 
            id="regPassword" 
            placeholder="Mínimo 6 caracteres"
            ref={regPasswordRef}
          />
        </div>
        <button onClick={registrar}>✅ Registrar Usuario</button>
        
        <h3>🔑 Login</h3>
        <div className="form-group">
          <label htmlFor="loginEmail">Email:</label>
          <input 
            type="email" 
            id="loginEmail" 
            placeholder="tu@email.com"
            ref={loginEmailRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Contraseña:</label>
          <input 
            type="password" 
            id="loginPassword" 
            placeholder="Tu contraseña"
            ref={loginPasswordRef}
          />
        </div>
        <button onClick={login}>🚀 Iniciar Sesión</button>
        
        <div id="tokenSection" className={tokenVisible ? '' : 'hidden'}>
          <h3>🔑 Token JWT</h3>
          <div className="token-display" id="tokenDisplay">{currentToken}</div>
          <button onClick={verificarToken}>✅ Verificar Token</button>
          <button onClick={obtenerPerfil}>👤 Obtener Perfil</button>
        </div>
      </div>
      
      {/* Sección de Perfil */}
      <div className="section">
        <h2>👤 Gestión de Perfil</h2>
        <div className="form-group">
          <label htmlFor="updateNombre">Nuevo Nombre:</label>
          <input 
            type="text" 
            id="updateNombre" 
            placeholder="Nuevo nombre"
            ref={updateNombreRef}
          />
        </div>
        <button onClick={actualizarPerfil}>🔄 Actualizar Perfil</button>
        <div id="profileResult"></div>
      </div>
      
      {/* Sección de Administración */}
      <div className="section">
        <h2>👑 Administración (Requiere Admin)</h2>
        
        <div className="flex-row">
          <button onClick={obtenerTodosUsuarios}>📋 Todos los Usuarios</button>
          <button onClick={obtenerEstadisticas}>📊 Estadísticas</button>
          <button onClick={obtenerAdmins}>👥 Listar Admins</button>
        </div>
        
        <h3>🔍 Buscar Usuario</h3>
        <div className="form-group">
          <label htmlFor="userId">ID de Usuario:</label>
          <input 
            type="text" 
            id="userId" 
            placeholder="507f1f77bcf86cd799439011"
            ref={userIdRef}
          />
        </div>
        <div className="flex-row">
          <button onClick={obtenerUsuarioPorId}>👤 Buscar por ID</button>
          <button onClick={obtenerHistorialRoles}>📜 Historial Roles</button>
        </div>
        
        <h3>⚙️ Gestión de Roles</h3>
        <div className="form-group">
          <label htmlFor="nuevoRol">Nuevo Rol:</label>
          <select id="nuevoRol" ref={nuevoRolRef}>
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="moderador">Moderador</option>
          </select>
        </div>
        <div className="flex-row">
          <button onClick={actualizarRol}>🔄 Cambiar Rol</button>
          <button className="secondary" onClick={promoverAdmin}>⬆️ Promover a Admin</button>
          <button className="danger" onClick={degradarUsuario}>⬇️ Degradar a Usuario</button>
        </div>
      </div>
      
      {/* Resultados */}
      <div className="section">
        <h2>📊 Resultados</h2>
        <div id="result">
          {result && (
            <div className={isError ? 'error' : 'result'}>
              <pre>{typeof result === 'string' ? result : JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;