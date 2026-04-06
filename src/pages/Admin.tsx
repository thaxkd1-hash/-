import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, Lock, Save, X, LogIn, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { Project } from '../types';
import { auth, googleProvider, signInWithPopup, onAuthStateChanged, User, ref, uploadBytes, getDownloadURL, storage } from '../firebase';
import { subscribeToProjects, addProject, updateProject, deleteProject } from '../services/firebaseService';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isPasswordAuthenticated, setIsPasswordAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    const unsubscribeProjects = subscribeToProjects((data) => {
      setProjects(data);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProjects();
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'images') => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProject) return;

    setUploading(true);
    setUploadProgress('이미지 최적화 중...');
    
    const compressionOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        
        // Compress image if it's an image file
        if (file.type.startsWith('image/')) {
          try {
            setUploadProgress(`이미지 압축 중 (${i + 1}/${files.length})...`);
            file = await imageCompression(file, compressionOptions);
          } catch (error) {
            console.error('Compression failed, using original file:', error);
          }
        }

        setUploadProgress(`이미지 업로드 중 (${i + 1}/${files.length})...`);
        const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(url);
      }

      if (type === 'thumbnail') {
        setEditingProject({ ...editingProject, thumbnail: uploadedUrls[0] });
      } else {
        setEditingProject({ 
          ...editingProject, 
          images: [...(editingProject.images || []), ...uploadedUrls] 
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  const removeImage = (index: number) => {
    if (!editingProject) return;
    const newImages = [...editingProject.images];
    newImages.splice(index, 1);
    setEditingProject({ ...editingProject, images: newImages });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsPasswordAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteProject(id);
      } catch (error) {
        alert('삭제에 실패했습니다. 권한을 확인해주세요.');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      try {
        const projectToSave = {
          ...editingProject,
          images: editingProject.images || []
        };
        if (isAdding) {
          const { id, ...projectData } = projectToSave;
          await addProject(projectData);
        } else {
          const { id, ...projectData } = projectToSave;
          await updateProject(id, projectData);
        }
        setEditingProject(null);
        setIsAdding(false);
      } catch (error) {
        alert('저장에 실패했습니다. 권한을 확인해주세요.');
      }
    }
  };

  const startAdding = () => {
    const newProject: Project = {
      id: '',
      title: '',
      category: '',
      thumbnail: '',
      images: [],
      overview: '',
      problem: '',
      goal: '',
      process: '',
      result: '',
      tools: [],
      featured: false,
      createdAt: Date.now(),
    };
    setEditingProject(newProject);
    setIsAdding(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isPasswordAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-12 rounded-3xl bg-card border border-white/5 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-8">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-8 tracking-tight">뉴비졔졔 Admin</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none text-center tracking-[1em]"
              placeholder="••••"
            />
            <button
              type="submit"
              className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent/80 transition-colors"
            >
              Unlock
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-12 rounded-3xl bg-card border border-white/5 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-8">
            <LogIn className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-4 tracking-tight">Google Login Required</h1>
          <p className="text-white/40 mb-8">관리자 권한 확인을 위해 구글 로그인이 필요합니다.</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-bg py-4 rounded-xl font-bold hover:bg-accent hover:text-white transition-all"
          >
            <LogIn className="w-5 h-5" />
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  const isAdmin = user.email === 'thaxkd1@gmail.com';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 max-w-7xl mx-auto px-6"
    >
      <div className="flex items-center justify-between mb-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">뉴비졔졔 Portfolio Management</h1>
          <div className="flex items-center gap-3">
            <p className="text-white/40 text-sm tracking-widest uppercase">Admin: {user.email}</p>
            {!isAdmin && (
              <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                No Write Permission
              </span>
            )}
          </div>
        </div>
        <button
          onClick={startAdding}
          disabled={!isAdmin}
          className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-8 rounded-2xl bg-card border border-white/5 flex items-center justify-between group hover:border-accent/30 transition-colors"
          >
            <div className="flex items-center gap-8">
              <div className="w-24 h-16 rounded-lg overflow-hidden bg-white/5">
                <img src={project.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-sm text-white/40 uppercase tracking-widest">{project.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEditingProject(project)}
                disabled={!isAdmin}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all disabled:opacity-20"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                disabled={!isAdmin}
                className="p-3 rounded-xl bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-500 transition-all disabled:opacity-20"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={() => setEditingProject(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-white/10 rounded-3xl p-12 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tight">
                {isAdding ? 'Add New Project' : 'Edit Project'}
              </h2>
              <button onClick={() => setEditingProject(null)} className="text-white/40 hover:text-white">
                <X className="w-8 h-8" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Category</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Thumbnail Image</label>
                <div className="flex items-center gap-6">
                  {editingProject.thumbnail && (
                    <div className="w-32 h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      <img src={editingProject.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50"
                  >
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                    {uploading ? uploadProgress : '이미지 업로드'}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileUpload(e, 'thumbnail')}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Project Images (Multiple)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {editingProject.images?.map((img, idx) => (
                    <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => multiFileInputRef.current?.click()}
                    disabled={uploading}
                    className="aspect-video rounded-xl border border-dashed border-white/20 hover:border-accent/50 hover:bg-accent/5 flex flex-col items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus className="w-6 h-6" />}
                    <span className="text-[10px] uppercase tracking-widest">
                      {uploading ? uploadProgress : 'Add Images'}
                    </span>
                  </button>
                </div>
                <input
                  type="file"
                  ref={multiFileInputRef}
                  onChange={(e) => handleFileUpload(e, 'images')}
                  className="hidden"
                  accept="image/*"
                  multiple
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Overview</label>
                <textarea
                  required
                  rows={3}
                  value={editingProject.overview}
                  onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Problem</label>
                  <textarea
                    required
                    rows={4}
                    value={editingProject.problem}
                    onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none resize-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Goal</label>
                  <textarea
                    required
                    rows={4}
                    value={editingProject.goal}
                    onChange={(e) => setEditingProject({ ...editingProject, goal: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Design Process (Markdown)</label>
                <textarea
                  required
                  rows={6}
                  value={editingProject.process}
                  onChange={(e) => setEditingProject({ ...editingProject, process: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Result</label>
                <textarea
                  required
                  rows={3}
                  value={editingProject.result}
                  onChange={(e) => setEditingProject({ ...editingProject, result: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-6 pt-8">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex items-center gap-2 bg-accent text-white px-12 py-4 rounded-xl font-bold hover:bg-accent/80 transition-all disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  Save Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
