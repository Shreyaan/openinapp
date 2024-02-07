import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { doc } from "firebase/firestore";

export function useAdminStatus() {
  const { status: userStatus, data: user, error: userError } = useUser();
  const firestore = useFirestore();

  // Always call useFirestoreDocData at the top level, not inside an if statement
  const ref = doc(firestore, `${user ? "admins" : "test"}`, user?.uid || "123");
  const {
    status: dbsStatus,
    data: uid,
    error: dbsError,
  } = useFirestoreDocData(ref);

  // Handle edge case where user is undefined
  if (!user) {
    return {
      isAdmin: false,
      isLoading: userStatus === "loading",
      error: userError,
    };
  }

  // Handle error cases
  if (userError || dbsError) {
    return { isAdmin: false, isLoading: false, error: userError || dbsError };
  }

  const isAdmin = uid != undefined;

  return {
    isAdmin,
    isLoading: userStatus === "loading" || dbsStatus === "loading",
    error: null,
  };
}
