// Refresh / initial load sequence orchestration
//
// Input:
//   - refs: { IPCheckRef, connectivityRef, webRTCRef, dnsLeaksRef }
//   - store: main store
//   - t: i18n translation function
//   - userPreferences: computed(() => store.userPreferences)
//   - infoMaskLevel: ref<number> — reset to 0 when refreshing
//
// Output:
//   - loadingControl(): initial load sequence starts (after all cards are mounted)
//
// Internal:
//   - monitor store.shouldRefreshEveryThing, trigger refresh → reset loadingStatus → schedule component refreshes → Alert → reset flag

import { watch } from 'vue';

function scheduleTimedTasks(tasks) {
    tasks.forEach((task) => {
        setTimeout(() => {
            task.action();
            if (task.after) task.after();
        }, task.delay);
    });
}

export function useRefreshOrchestrator({ refs, store, t, userPreferences, infoMaskLevel }) {
    const refreshingAlert = () => {
        store.setAlert(
            true,
            'text-success',
            t('alert.refreshEverythingMessage'),
            t('alert.refreshEverythingTitle'),
        );
    };

    const refreshEverything = () => {
        store.setLoadingStatus('Connectivity', false);
        store.setLoadingStatus('WebRTC', false);
        store.setLoadingStatus('DNSLeakTest', false);
        store.setLoadingStatus('IPInfo', false);

        const { IPCheckRef, connectivityRef, webRTCRef, dnsLeaksRef } = refs;
        scheduleTimedTasks([
            { action: () => IPCheckRef.value.checkAllIPs(), delay: 0 },
            { action: () => connectivityRef.value.handelCheckStart(true), delay: 300 },
            { action: () => webRTCRef.value.checkAllWebRTC(true), delay: 200 },
            { action: () => dnsLeaksRef.value.checkAllDNSLeakTest(true), delay: 100 },
            { action: () => refreshingAlert(), delay: 300 },
        ]);
        infoMaskLevel.value = 0;
        store.setRefreshEveryThing(false);
    };

    const loadingControl = (t1 = 0, t2 = 300, t3 = 200, t4 = 100) => {
        const { IPCheckRef, connectivityRef, webRTCRef, dnsLeaksRef } = refs;
        const mountedStatus = Object.values(store.mountingStatus).every(Boolean);
        if (mountedStatus) {
            setTimeout(() => IPCheckRef.value.checkAllIPs(), t1);
            if (userPreferences.value.autoStart) {
                setTimeout(() => connectivityRef.value.handelCheckStart(), t2);
                setTimeout(() => webRTCRef.value.checkAllWebRTC(false), t3);
                setTimeout(() => dnsLeaksRef.value.checkAllDNSLeakTest(false), t4);
            } else {
                store.setLoadingStatus('Connectivity', true);
                store.setLoadingStatus('WebRTC', true);
                store.setLoadingStatus('DNSLeakTest', true);
            }
        } else {
            setTimeout(() => loadingControl(t1, t2, t3, t4), 100);
        }
    };

    watch(
        () => store.shouldRefreshEveryThing,
        (newVal) => {
            if (newVal) refreshEverything();
        },
    );

    return { loadingControl };
}
