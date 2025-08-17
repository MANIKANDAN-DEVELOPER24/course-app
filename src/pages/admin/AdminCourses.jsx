// import React, { useEffect, useState } from "react";
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   TextField, Typography
// } from "@mui/material";
// import api from "../../api/axiosConfig";  
//  // ✅ use your custom axios instance

// const AdminCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [editCourse, setEditCourse] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [newCourse, setNewCourse] = useState({
//     name: "",
//     price: "",
//     instructor: "",
//     duration: "",
//     ratings: "",
//     description: "",
//     image: null
//   });

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await api.get("courses/");
//       setCourses(res.data);
//     } catch (err) {
//       console.error("Error fetching courses", err);
//     }
//   };

//   const onChangeNew = (k) => (e) => {
//     if (k === "image") {
//       setNewCourse({ ...newCourse, image: e.target.files[0] });
//     } else {
//       setNewCourse({ ...newCourse, [k]: e.target.value });
//     }
//   };

//   const handleAddCourse = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.entries(newCourse).forEach(([key, value]) => {
//         if (value) formData.append(key, value);
//       });

//       await api.post("courses/", formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       setMessage("Course added successfully!");
//       setNewCourse({
//         name: "",
//         price: "",
//         instructor: "",
//         duration: "",
//         ratings: "",
//         description: "",
//         image: null,
//       });
//       fetchCourses();
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to add course");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) return;

//     try {
//       await api.delete(`courses/${id}/delete/`);
//       fetchCourses();
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   const handleEdit = (course) => {
//     setEditCourse(course);
//   };

//   const handleUpdate = async () => {
//     try {
//       const formData = new FormData();
//       Object.entries(editCourse).forEach(([key, value]) => {
//         if (key === "image" && value instanceof File) {
//           formData.append("image", value);
//         } else if (key !== "id") {
//           formData.append(key, value);
//         }
//       });

//       await api.put(`courses/${editCourse.id}/update/`, formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       setEditCourse(null);
//       fetchCourses();
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Add Course Form */}
//       <Typography variant="h6" gutterBottom>
//         Add New Course
//       </Typography>
//       {message && <Typography sx={{ mb: 2 }}>{message}</Typography>}
//       <form onSubmit={handleAddCourse} style={{ marginBottom: "20px" }}>
//         <TextField label="Name" value={newCourse.name} onChange={onChangeNew("name")} sx={{ mr: 2, mb: 2 }} />
//         <TextField label="Price" value={newCourse.price} onChange={onChangeNew("price")} sx={{ mr: 2, mb: 2 }} />
//         <TextField label="Instructor" value={newCourse.instructor} onChange={onChangeNew("instructor")} sx={{ mr: 2, mb: 2 }} />
//         <TextField label="Duration" value={newCourse.duration} onChange={onChangeNew("duration")} sx={{ mr: 2, mb: 2 }} />
//         <TextField label="Ratings" value={newCourse.ratings} onChange={onChangeNew("ratings")} sx={{ mr: 2, mb: 2 }} />
//         <Button variant="contained" component="label" sx={{ mb: 2, mr: 2 }}>
//           Upload Image
//           <input type="file" hidden onChange={onChangeNew("image")} />
//         </Button>
//         <TextField label="Description" value={newCourse.description} onChange={onChangeNew("description")} fullWidth multiline rows={2} sx={{ mb: 2 }} />
//         <Button variant="contained" type="submit">Add Course</Button>
//       </form>

//       {/* Course List */}
//       <Typography variant="h6" gutterBottom>Manage Courses</Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Instructor</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Duration</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {courses.map((course) => (
//               <TableRow key={course.id}>
//                 <TableCell>{course.id}</TableCell>
//                 <TableCell>{course.name}</TableCell>
//                 <TableCell>{course.instructor}</TableCell>
//                 <TableCell>${course.price}</TableCell>
//                 <TableCell>{course.duration}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(course)} sx={{ mr: 1 }}>
//                     Edit
//                   </Button>
//                   <Button variant="contained" color="error" size="small" onClick={() => handleDelete(course.id)}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Edit Modal */}
//       {editCourse && (
//         <Dialog open={true} onClose={() => setEditCourse(null)}>
//           <DialogTitle>Edit Course</DialogTitle>
//           <DialogContent>
//             <TextField margin="dense" label="Name" fullWidth value={editCourse.name} onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })} />
//             <TextField margin="dense" label="Instructor" fullWidth value={editCourse.instructor} onChange={(e) => setEditCourse({ ...editCourse, instructor: e.target.value })} />
//             <TextField margin="dense" label="Price" type="number" fullWidth value={editCourse.price} onChange={(e) => setEditCourse({ ...editCourse, price: e.target.value })} />
//             <TextField margin="dense" label="Duration" fullWidth value={editCourse.duration} onChange={(e) => setEditCourse({ ...editCourse, duration: e.target.value })} />
//             <TextField margin="dense" label="Ratings" fullWidth value={editCourse.ratings} onChange={(e) => setEditCourse({ ...editCourse, ratings: e.target.value })} />
//             <TextField margin="dense" label="Description" fullWidth multiline rows={2} value={editCourse.description} onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })} />
//             <Button variant="contained" component="label" sx={{ mt: 2 }}>
//               Upload New Image
//               <input type="file" hidden onChange={(e) => setEditCourse({ ...editCourse, image: e.target.files[0] })} />
//             </Button>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setEditCourse(null)}>Cancel</Button>
//             <Button onClick={handleUpdate} variant="contained" color="primary">Save</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default AdminCourses;

import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography
} from "@mui/material";
import api from '../../api/axiosConfig';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "", price: "", instructor: "", duration: "", ratings: "", description: "", image: null
  });

  // Fetch all courses
  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("courses/");
      setCourses(res.data);
    } catch (err) { console.error(err); }
  };

  // Handle input changes
  const onChangeNew = (key) => (e) => {
    if (key === "image") setNewCourse({ ...newCourse, image: e.target.files[0] });
    else setNewCourse({ ...newCourse, [key]: e.target.value });
  };

  const onChangeEdit = (key) => (e) => {
    if (key === "image") setEditCourse({ ...editCourse, image: e.target.files[0] });
    else setEditCourse({ ...editCourse, [key]: e.target.value });
  };

  // Add course
  const handleAddCourse = async () => {
    try {
      const formData = new FormData();
      Object.entries(newCourse).forEach(([key, value]) => { if(value) formData.append(key, value); });

      const token = localStorage.getItem("access_token");
      await api.post("courses/", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setOpenAdd(false);
      setNewCourse({ name: "", price: "", instructor: "", duration: "", ratings: "", description: "", image: null });
      fetchCourses();
    } catch (err) { console.error(err); }
  };

  // Edit course
  const handleEditCourse = async () => {
    try {
      const formData = new FormData();
      Object.entries(editCourse).forEach(([key, value]) => { if(value) formData.append(key, value); });

      const token = localStorage.getItem("access_token");
      await api.put(`courses/${editCourse.id}/update/`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setEditCourse(null);
      fetchCourses();
    } catch (err) { console.error(err); }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      const token = localStorage.getItem("access_token");
      await api.delete(`courses/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCourses();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>Manage Courses</Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setOpenAdd(true)}>
        Add Course
      </Button>

      {/* Courses Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell><TableCell>Name</TableCell>
              <TableCell>Instructor</TableCell><TableCell>Price</TableCell>
              <TableCell>Duration</TableCell><TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <Button color="primary" size="small" sx={{ mr:1 }} onClick={() => setEditCourse(course)}>Edit</Button>
                  <Button color="error" size="small" onClick={() => handleDelete(course.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Course Modal */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" value={newCourse.name} onChange={onChangeNew("name")} />
          <TextField fullWidth margin="dense" label="Instructor" value={newCourse.instructor} onChange={onChangeNew("instructor")} />
          <TextField fullWidth margin="dense" label="Price" type="number" value={newCourse.price} onChange={onChangeNew("price")} />
          <TextField fullWidth margin="dense" label="Duration" value={newCourse.duration} onChange={onChangeNew("duration")} />
          <TextField fullWidth margin="dense" label="Ratings" value={newCourse.ratings} onChange={onChangeNew("ratings")} />
          <TextField fullWidth margin="dense" label="Description" multiline rows={3} value={newCourse.description} onChange={onChangeNew("description")} />
          <Button variant="contained" component="label" sx={{ mt:1 }}>
            Upload Image
            <input type="file" hidden onChange={onChangeNew("image")} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCourse}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Course Modal */}
      {editCourse && (
        <Dialog open={true} onClose={() => setEditCourse(null)}>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogContent>
            <TextField fullWidth margin="dense" label="Name" value={editCourse.name} onChange={onChangeEdit("name")} />
            <TextField fullWidth margin="dense" label="Instructor" value={editCourse.instructor} onChange={onChangeEdit("instructor")} />
            <TextField fullWidth margin="dense" label="Price" type="number" value={editCourse.price} onChange={onChangeEdit("price")} />
            <TextField fullWidth margin="dense" label="Duration" value={editCourse.duration} onChange={onChangeEdit("duration")} />
            <TextField fullWidth margin="dense" label="Ratings" value={editCourse.ratings} onChange={onChangeEdit("ratings")} />
            <TextField fullWidth margin="dense" label="Description" multiline rows={3} value={editCourse.description} onChange={onChangeEdit("description")} />
            <Button variant="contained" component="label" sx={{ mt:1 }}>
              Upload Image
              <input type="file" hidden onChange={onChangeEdit("image")} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditCourse(null)}>Cancel</Button>
            <Button variant="contained" onClick={handleEditCourse}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AdminCourses;
