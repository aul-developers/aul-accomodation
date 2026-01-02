export type Hostel = {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number; // Base price (string representation "From X")
    availableRooms: number;
    capacity: number;
    gender: "Male" | "Female" | "Mixed";
    roomTypes: number[]; // Array of bed counts available
    priceList: Record<number, number>; // Capacity -> Price mapping
};

export type Room = {
    id: string;
    hostelId: string;
    roomNumber: string;
    capacity: number;
    occupants: string[]; // Student IDs
    status: "Available" | "Full" | "Maintenance";
};

export type Allocation = {
    id: string;
    studentId: string;
    studentName: string;
    studentMatric: string;
    hostelId: string;
    hostelName: string;
    roomId: string; // References Room.id
    roomNumber: string;
    status: "Active" | "Pending" | "Expired";
    dateAllocated: string;
    amountPaid: number;
    bedSpace: string;
};

// 1. Define Hostels with Specific Bed Configurations
export const hostels: Hostel[] = [
    {
        id: "peace",
        name: "Peace Hall",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2938&auto=format&fit=crop",
        description: "Official Male Undergraduate Hall. Available room configurations: 4, 6, 8, 10, 12 beds.",
        price: 150000,
        availableRooms: 0,
        capacity: 0,
        gender: "Male",
        roomTypes: [4, 6, 8, 10, 12],
        priceList: {
            4: 250000,
            6: 150000,
            8: 100000,
            10: 80000,
            12: 60000
        }
    },
    {
        id: "progress",
        name: "Progress Hall",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2940&auto=format&fit=crop",
        description: "Standard Male Undergraduate Hall with 4, 6, 8, and 10 bed options.",
        price: 120000,
        availableRooms: 0,
        capacity: 0,
        gender: "Male",
        roomTypes: [4, 6, 8, 10],
        priceList: {
            4: 250000,
            6: 150000,
            8: 100000,
            10: 80000
        }
    },
    {
        id: "purity",
        name: "Purity Hall",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2340&auto=format&fit=crop",
        description: "Official Female Undergraduate Hall. Available room configurations: 4 to 12 beds.",
        price: 150000,
        availableRooms: 0,
        capacity: 0,
        gender: "Female",
        roomTypes: [4, 6, 8, 10, 12],
        priceList: {
            4: 250000,
            6: 150000,
            8: 100000,
            10: 80000,
            12: 60000
        }
    },
    {
        id: "patience",
        name: "Patience Hall",
        image: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?q=80&w=2940&auto=format&fit=crop",
        description: "Standard Female Undergraduate Hall offering 2 to 8 bed spaces.",
        price: 130000,
        availableRooms: 0,
        capacity: 0,
        gender: "Female",
        roomTypes: [2, 4, 6, 8],
        priceList: {
            2: 300000,
            4: 250000,
            6: 150000,
            8: 100000
        }
    },
    {
        id: "patience-executive",
        name: "Patience Hall (Executive)",
        image: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?q=80&w=2940&auto=format&fit=crop",
        description: "Premium Wing. Exclusive 2-Bed Executive Suites.",
        price: 350000,
        availableRooms: 0,
        capacity: 0,
        gender: "Female",
        roomTypes: [2],
        priceList: {
            2: 350000
        }
    },
    {
        id: "peculiar",
        name: "Peculiar Hall",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2340&auto=format&fit=crop",
        description: "Female Undergraduate Hall (Wing B). Configurations: 4, 6, 8 beds.",
        price: 100000,
        availableRooms: 0,
        capacity: 0,
        gender: "Female",
        roomTypes: [4, 6, 8],
        priceList: {
            4: 250000,
            6: 150000,
            8: 100000
        }
    },
    {
        id: "guest-house",
        name: "University Guest House",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop",
        description: "Executive Accommodation for Postgraduate Students and Staff. 2-Bed Suites.",
        price: 1000000,
        availableRooms: 0,
        capacity: 0,
        gender: "Female",
        roomTypes: [2],
        priceList: {
            2: 1000000
        }
    }
];

// 2. Generate Specific Mock Rooms based on RoomTypes
export let rooms: Room[] = [];

hostels.forEach(hostel => {
    let hostelCapacity = 0;
    let hostelAvailable = 0;

    // Create 5 rooms for EACH room type specified for this hostel
    // e.g., if types are [4, 6], we create 5x 4-bed rooms and 5x 6-bed rooms
    hostel.roomTypes.forEach(capacity => {
        for (let i = 1; i <= 5; i++) {
            const roomNum = `${capacity}0${i}`; // e.g., 401, 402... 1401

            // Random occupancy simulation
            // Guest house is mostly empty, others random
            const occupantsCount = hostel.id === 'guest-house' ? 0 : Math.floor(Math.random() * (capacity + 1));
            const status = occupantsCount >= capacity ? "Full" : "Available";

            // Generate mock occupants
            const occupants = Array.from({ length: occupantsCount }).map((_, idx) => `ST-${hostel.id.substring(0, 2).toUpperCase()}-${roomNum}-${idx}`);

            rooms.push({
                id: `${hostel.id}-${roomNum}`,
                hostelId: hostel.id,
                roomNumber: roomNum,
                capacity: capacity,
                occupants: occupants,
                status: status
            });

            hostelCapacity += capacity;
            if (status === "Available") hostelAvailable += (capacity - occupantsCount);
        }
    });

    // Updates stats
    hostel.capacity = hostelCapacity;
    hostel.availableRooms = hostelAvailable;
});

// 3. Generate Allocations based on populated rooms
export const allocations: Allocation[] = rooms
    .filter(r => r.occupants.length > 0)
    .flatMap(room => {
        const hostel = hostels.find(h => h.id === room.hostelId)!;
        return room.occupants.map((studentId, index) => ({
            id: `AL-${Math.floor(Math.random() * 10000)}`,
            studentId: studentId,
            studentName: `Student ${studentId.split('-')[3] || index}`, // Mock name
            studentMatric: `AUL/SCI/24/${Math.floor(Math.random() * 8999) + 1000}`,
            hostelId: hostel.id,
            hostelName: hostel.name,
            roomId: room.id,
            roomNumber: room.roomNumber,
            status: "Active",
            dateAllocated: "2025-10-15",
            amountPaid: hostel.priceList[room.capacity] || hostel.price,
            bedSpace: `Bed ${index + 1}`
        }));
    });
