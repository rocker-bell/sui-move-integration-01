// import { useEffect, useState, useCallback } from 'react';
// import { suiClient } from '../lib/suiClient';
// import { PACKAGE_ID } from '../config/sui';

// export function useTasks(address) {
//   const [tasks, setTasks] = useState([]);

//   const loadTasks = useCallback(async () => {
//     if (!address) return;

//     const res = await suiClient.getOwnedObjects({
//       owner: address,
//       options: {
//         showContent: true,
//       },
//     });

//     const filtered = res.data
//       .map((item) => item.data?.content)
//       .filter(
//         (content) =>
//           content?.type === `${PACKAGE_ID}::task::Task`
//       )
//       .map((content) => ({
//         objectId: content.fields.id.id,
//         fields: content.fields,
//       }));

//     setTasks(filtered);
//   }, [address]);

//   useEffect(() => {
//     loadTasks();
//   }, [loadTasks]);

//   return { tasks, reload: loadTasks };
// }


import { useEffect, useState, useCallback } from 'react';
import { suiClient } from '../lib/suiClient';
import { OLD_PACKAGE_ID, NEW_PACKAGE_ID } from '../config/sui';

export function useTasks(address) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async () => {
    if (!address) return;

    const res = await suiClient.getOwnedObjects({
      owner: address,
      options: {
        showContent: true,
      },
    });

    const filtered = res.data
      .map((item) => item.data?.content)
      .filter((content) => {
        if (!content?.type) return false;

        return (
          content.type === `${OLD_PACKAGE_ID}::task::Task` ||
          content.type === `${NEW_PACKAGE_ID}::task::Task`
        );
      })
      .map((content) => ({
        objectId: content.fields.id.id,
        fields: content.fields,
        type: content.type,
      }));

    setTasks(filtered);
  }, [address, OLD_PACKAGE_ID, NEW_PACKAGE_ID]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return { tasks, reload: loadTasks };
}