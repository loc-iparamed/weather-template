import {Eye} from 'lucide-react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

const nodeList = [
  {name: 'Node 1', path: '/weather-station/node1/dashboard'},
  {name: 'Node 2', path: '/weather-station/node2/dashboard'},
];

const ListNode = () => {
  const navigate = useNavigate();

  const handleView = path => {
    navigate(path);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="w-full max-w-screen-xl mx-auto py-10 px-6 lg:px-10">
        <motion.div
          className="bg-white shadow-xl rounded-lg overflow-hidden"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <table className="w-full table-fixed border border-collapse">
            <thead className="bg-[#a6cfd4] text-white text-base lg:text-xl uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-8 py-4 w-1/2 border border-[#78b3bb]">
                  List Node
                </th>
                <th className="px-8 py-4 w-1/2 border border-[#78b3bb]">
                  Function
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-base lg:text-lg font-medium">
              {nodeList.map((node, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#f0f9fa] transition duration-200">
                  <td className="px-8 py-5 border border-[#d4e6e8]">
                    {node.name}
                  </td>
                  <td className="px-8 py-5 border border-[#d4e6e8]">
                    <button
                      className="p-3 rounded-full bg-[#78b3bb]/20 hover:bg-[#78b3bb]/40 transition"
                      onClick={() => handleView(node.path)}>
                      <Eye className="h-6 w-6 text-[#1f4c4f]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
};

export default ListNode;
