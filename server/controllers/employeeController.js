import Employee from '../models/Employee.js';
import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcrypt';


const addEmployee = async (req, res) => {
    try {
        const{
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role
        } = req.body;

        // Validate required fields
        if (!name || !email || !password || !role || !department || !employeeId || !salary) {
            return res.status(400).json({success: false, error: "Missing required fields: name, email, password, role, department, employeeId, salary"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({success: false, error: "User already registered"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role
        })
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob: dob ? new Date(dob) : null,
            gender,
            maritalStatus,
            designation,
            department,
            salary: Number(salary)
        })

        const savedEmployee = await newEmployee.save();
        return res.status(201).json({success: true, message: "Employee created successfully", employeeId: savedEmployee._id});

    } catch (error) {
        console.error("Error in addEmployee:", error);
        let errorMessage = "Server error in employee creation";
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            errorMessage = messages.join(', ');
        }
        // Handle duplicate key error
        else if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            errorMessage = `${field} already exists`;
        }
        
        return res.status(500).json({success: false, error: errorMessage});
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate("department");
        return res.status(200).json({ success: true, employees });
    }catch (error) {
        return res.status(500).json({ success: false, error: "get employees Server Error" });
    }
}

const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        // Log the incoming id for debugging (helps explain 404s)
        console.log(`getEmployee called with id=${id}`);

        // Try multiple lookup strategies in a deterministic order.
        // If id looks like a Mongo ObjectId, try findById first (common when frontend passes employee._id).
        // Then try findOne by userId, then try findOne by employeeId (the human-friendly employeeId string).
        let employee = null;
        const tried = [];

        if (mongoose.Types.ObjectId.isValid(id)) {
            tried.push({by: 'employee._id', value: id});
            employee = await Employee.findById(id).populate('userId', { password: 0 }).populate('department');
            if (employee) console.log(`Found employee by _id=${id}`);
        }

        if (!employee) {
            // try as userId (ref to User)
            tried.push({by: 'userId', value: id});
            employee = await Employee.findOne({ userId: id }).populate('userId', { password: 0 }).populate('department');
            if (employee) console.log(`Found employee by userId=${id}`);
        }

        if (!employee) {
            // try by employeeId (string field)
            tried.push({by: 'employeeId', value: id});
            employee = await Employee.findOne({ employeeId: id }).populate('userId', { password: 0 }).populate('department');
            if (employee) console.log(`Found employee by employeeId=${id}`);
        }

        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error('getEmployee error:', error && error.message ? error.message : error);
        return res.status(500).json({ success: false, error: 'get employee Server Error' });
    }
}

export { addEmployee, getEmployees, getEmployee };