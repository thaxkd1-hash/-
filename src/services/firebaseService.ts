import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  FirestoreError,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Project } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const PROJECTS_COLLECTION = 'projects';

export const subscribeToProjects = (callback: (projects: Project[]) => void) => {
  const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
    callback(projects);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
  });
};

export const addProject = async (project: Omit<Project, 'id'>) => {
  try {
    await addDoc(collection(db, PROJECTS_COLLECTION), project);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, PROJECTS_COLLECTION);
  }
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(projectRef, project);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PROJECTS_COLLECTION}/${id}`);
  }
};

export const deleteProject = async (id: string) => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(projectRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PROJECTS_COLLECTION}/${id}`);
  }
};

export const getProject = async (id: string): Promise<Project | null> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    const snapshot = await getDoc(projectRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Project;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${PROJECTS_COLLECTION}/${id}`);
    return null;
  }
};
