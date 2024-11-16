// Mock Firebase functions for demo purposes
export const createUser = async (email: string, password: string) => {
  return {
    user: {
      uid: `user_${Date.now()}`,
      email,
      displayName: email.split('@')[0]
    }
  };
};

export const signInUser = async (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: any) => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  return {
    user: {
      uid: user.id,
      email: user.email,
      displayName: user.name
    }
  };
};

export const signOutUser = async () => {
  localStorage.removeItem('currentUser');
  return true;
};

export const updateUserProfile = async (userId: string, data: any) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const updatedUsers = users.map((user: any) => 
    user.id === userId ? { ...user, ...data } : user
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return true;
};