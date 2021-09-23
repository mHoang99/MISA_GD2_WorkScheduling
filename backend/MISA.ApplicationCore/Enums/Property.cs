﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Enums
{
    /// <summary>
    /// Trạng thái của entity
    /// </summary>
    /// CREATEDBY: VMHOANG
    public enum EntityState
    {
        GET = 0,
        ADD = 1,
        UPDATE = 2,
        REMOVE = 3
    }

    /// <summary>
    /// Giới tính
    /// </summary>
    /// CREATEDBY: VMHOANG
    public enum Gender
    {
        MALE = 1,
        FEMALE = 0
    }

    /// <summary>
    /// Trạng thái của event lịch
    /// </summary>
    /// CREATEDBY: VMHOANG
    public enum EventState
    {
        WAITING = 0,
        APPROVED = 1,
        COMPLETED = 2
    }
}
