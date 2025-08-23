// src/components/circles/CircleCard.jsx
export default function CircleCard({ circle }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{circle.name}</h2>
        <button className="text-blue-600 text-sm">Edit</button>
      </div>
      <div className="space-y-2">
        {circle.members.slice(0, 3).map((m) => (
          <div key={m.id} className="bg-gray-100 rounded-lg p-3 flex items-center">
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold mr-3">
              {m.name[0]}
            </div>
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-gray-600">{m.relation}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-3 p-3 bg-blue-500 text-white rounded-lg">+ Add Member</button>
    </div>
  );
}
